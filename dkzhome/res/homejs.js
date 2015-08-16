window.onload=function(){
	fullPage();
};
var conY;
function setHomeWH(){
	var homecon=document.getElementById('homecon');
	var skillcon=document.getElementById('skillcon');
	var expcon=document.getElementById('expcon');
	var contactcon=document.getElementById('contactcon');

	homecon.style.width='100%';
	homecon.style.height=window.innerHeight+'px';
	homecon.style.backgroundColor='#f00';

	skillcon.style.width='100%';
	skillcon.style.height=window.innerHeight+'px';
	skillcon.style.backgroundColor='#444';

	expcon.style.width='100%';
	expcon.style.height=window.innerHeight+'px';
	expcon.style.backgroundColor='#0f0';

	contactcon.style.width='100%';
	contactcon.style.height=window.innerHeight+'px';
	contactcon.style.backgroundColor='#222';

	var homeconY=homecon.getBoundingClientRect().top+document.body.scrollTop;
	var skillconY=skillcon.getBoundingClientRect().top+document.body.scrollTop;
	var expconY=expcon.getBoundingClientRect().top+document.body.scrollTop;
	var contactconY=contactcon.getBoundingClientRect().top+document.body.scrollTop;
	
	conY=[homeconY,skillconY,expconY,contactconY];

}
function fullPage(){
	setHomeWH();

	var navul=document.getElementById('navul');
	var nowCon=0;
	setNowCon(nowCon);
	window.scrollTo(0,0);
	if(window.location.hash==='#contact'){
		nowCon=3;
		var toY=conY[nowCon];
		scrollToAnimate(toY,function(){
			setNowCon(nowCon);
		});
	}

	navul.onclick=function(e){
		nowCon=Number(e.target.id.substring(3));
		var toY=conY[nowCon];
		scrollToAnimate(toY,function(){
			setNowCon(nowCon);
		});
	}

	var prevY=0;

	window.onscroll=function(e){
		var nowY=document.documentElement.scrollTop+document.body.scrollTop;
		if(nowY>prevY&&!isscrolling){
			if(nowCon<3){
				nowCon++;
				scrollToAnimate(conY[nowCon],function(){
					setNowCon(nowCon);
				});
			}

		}else if(prevY>nowY&&!isscrolling){
			if(nowCon>0){
				nowCon--;
				scrollToAnimate(conY[nowCon],function(){
					setNowCon(nowCon);
				});
			}
		}
		prevY=nowY;
	}
	window.onresize=function(){
		setHomeWH();
	}
}
var isscrolling=false;
function scrollToAnimate(y,callback){
	if(!isscrolling){
	isscrolling=true;
	var nowY=document.documentElement.scrollTop+document.body.scrollTop;
	var step=(y-nowY)/30;
	nowY+=step*5;
	window.scrollTo(0,nowY);
	var count=25;
	function animateloop(){
		nowY+=step;
		count--;
		window.scrollTo(0,nowY);
		if(count>0){
			setTimeout(animateloop,20);
		}else{
			setTimeout(function(){
				if(callback){
					callback();
				}
				isscrolling=false;
			},30)
		}
	}
	animateloop();

	}
	
}
function setNowCon(nowCon){
	document.getElementById('nav0').className='';
	document.getElementById('nav1').className='';
	document.getElementById('nav2').className='';
	document.getElementById('nav3').className='';
	var nav=document.getElementById('nav'+nowCon).className='navNow';
}


