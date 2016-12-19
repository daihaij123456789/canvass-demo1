var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=768;
var r=8;
var MARGIN_TOP=60;
var MARGIN_LEFT=30;
var endTime=new Date();
endTime.setTime(endTime.getTime()+3600*1000)
var curShowTimeSeconds=0;
var balls=[];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

window.onload=function () {
	//WINDOW_WIDTH=document.body.clientWidth;
	WINDOW_WIDTH=document.documentElement.clientWidth-20;
	//WINDOW_HEIGHT=document.body.clientHeight;
	WINDOW_HEIGHT=document.documentElement.clientHeight-20;
	MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
	r=Math.round(WINDOW_WIDTH*4/5/108)-1;
	MARGIN_TOP=Math.round(WINDOW_HEIGHT/5);
	var canvas=document.getElementById("canvas");
	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;
	var context=canvas.getContext("2d");

	curShowTimeSeconds=getCurrentShowTimeSeconds()
	setInterval(function () {
		render(context);
		update();
	}, 50);
}


function getCurrentShowTimeSeconds() {
	
	var curTime=new Date();
	var ret=endTime.getTime()-curTime.getTime();
	ret=Math.round(ret/1000);
	return ret>=0?ret:0;
}


function update() {
	var nextShowTimeSeconds=getCurrentShowTimeSeconds();

	var nextHours=parseInt(nextShowTimeSeconds/3600);
	var nextMinutes=parseInt((nextShowTimeSeconds-nextHours*3600)/60);
	var nextSeconds=nextShowTimeSeconds%60;

	var curHours=parseInt(curShowTimeSeconds/3600);
	var curMinutes=parseInt((curShowTimeSeconds-curHours*3600)/60);
	var curSeconds=curShowTimeSeconds%60;

	if (nextSeconds!=curSeconds) {
		
		if (parseInt(curHours/10)!=parseInt(nextHours/10)) {
			addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(curHours/10))
		}
		if (parseInt(curHours%10)!=parseInt(nextHours%10)) {
			addBalls(MARGIN_LEFT+15*(r+1),MARGIN_TOP,parseInt(curHours/10))
		}
		if (parseInt(curMinutes/10)!=parseInt(nextMinutes/10)) {
			addBalls(MARGIN_LEFT+39*(r+1),MARGIN_TOP,parseInt(curMinutes/10))
		}
		if (parseInt(curMinutes%10)!=parseInt(nextMinutes%10)) {
			addBalls(MARGIN_LEFT+54*(r+1),MARGIN_TOP,parseInt(curMinutes%10))
		}
		if (parseInt(curSeconds/10)!=parseInt(nextSeconds/10)) {
			addBalls(MARGIN_LEFT+78*(r+1),MARGIN_TOP,parseInt(curSeconds/10))
		}
		if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( MARGIN_LEFT + 93*(r+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
        }
		curShowTimeSeconds=nextShowTimeSeconds;
	}

    updateBalls();
    console.log(balls.length);
	
}

function updateBalls() {
	for (var i = 0; i < balls.length; i++) {
		balls[i].vy+=balls[i].g;
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		if (balls[i].y>=WINDOW_HEIGHT-r) {
			balls[i].y=WINDOW_HEIGHT-r;
			balls[i].vy=-balls[i].vy*0.75;
		}
	}
	var cnt=0;
	for (var i = 0; i < balls.length; i++) {
		if (balls[i].x+r>0&&balls[i].x-r<WINDOW_WIDTH) {
			balls[cnt++]=balls[i]
		}

	}
	while(balls.length>cnt){
				balls.pop();
			}
}

function addBalls(x,y,num) {
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if(digit[num][i][j]==1){
				var aBall={
					x:x+j*2*(r+1)+(r+1),
					y:y+i*2*(r+1)+(r+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]

				}
				balls.push(aBall);
			}
		}
	}
}
function render(ctx) {
	ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
	var hours=parseInt(curShowTimeSeconds/3600);
	var minutes=parseInt((curShowTimeSeconds-hours*3600)/60);
	var seconds=curShowTimeSeconds%60;
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),ctx);
	renderDigit(MARGIN_LEFT+15*(r+1),MARGIN_TOP,parseInt(hours%10),ctx);
	renderDigit(MARGIN_LEFT+30*(r+1),MARGIN_TOP,10,ctx);
	renderDigit(MARGIN_LEFT+39*(r+1),MARGIN_TOP,parseInt(minutes/10),ctx);
	renderDigit(MARGIN_LEFT+54*(r+1),MARGIN_TOP,parseInt(minutes%10),ctx);
	renderDigit(MARGIN_LEFT+69*(r+1),MARGIN_TOP,10,ctx);
	renderDigit(MARGIN_LEFT+78*(r+1),MARGIN_TOP,parseInt(seconds/10),ctx);
	renderDigit(MARGIN_LEFT+93*(r+1),MARGIN_TOP,parseInt(seconds%10),ctx);

	for (var i = 0; i < balls.length; i++) {
		ctx.fillStyle = balls[i].color;
		ctx.beginPath();
		ctx.arc(balls[i].x, balls[i].y, r, 0, Math.PI*2);
		ctx.closePath();
		ctx.fill();

	}
		
}
function renderDigit(x,y,num,ctx) {
	ctx.fillStyle = "rgb(0,102,153)";
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j]==1) {
				ctx.beginPath();
				ctx.arc(x+j*2*(r+1)+(r+1), y+i*2*(r+1)+(r+1), r, 0, Math.PI*2);
				ctx.closePath();
				ctx.fill();
			}
		}
	}
}