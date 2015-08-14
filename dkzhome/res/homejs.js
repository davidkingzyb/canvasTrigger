window.onload=function(){
	setHomeWH();
	fullPage();
};
function fullPage(){
	var homecon=document.getElementById('homecon');
	var skillcon=document.getElementById('skillcon');
	var expcon=document.getElementById('expcon');
	var contactcon=document.getElementById('contactcon');
	var homeconY=homecon.getBoundingClientRect().top+document.body.scrollTop;
	var skillconY=skillcon.getBoundingClientRect().top+document.body.scrollTop;
	var expconY=expcon.getBoundingClientRect().top+document.body.scrollTop;
	var contactconY=contactcon.getBoundingClientRect().top+document.body.scrollTop;
	var navul=document.getElementById('navul');
	var conY=[homeconY,skillconY,expconY,contactconY];
	navul.onclick=function(e){
		var toY=conY[Number(e.target.id.substring(3))];
		scrollToAnimate(toY);
	}
	var prevY=0;
	window.onscroll=function(e){
		var nowY=document.documentElement.scrollTop+document.body.scrollTop;
		console.log()

	}
}
var isscrolling=false;
function scrollToAnimate(y){
	if(!isscrolling){
	isscrolling=true;
	var nowY=document.documentElement.scrollTop+document.body.scrollTop;
	var step=(y-nowY)/50;
	var count=50;
	function animateloop(){
		nowY+=step;
		count--;
		window.scrollTo(0,nowY);
		if(count>0){
			setTimeout(animateloop,10);
		}else{
			isscrolling=false;
		}
	}
	animateloop();

	}
	
}
function setHomeWH(){
	var homecon=document.getElementById('homecon');
	var skillcon=document.getElementById('skillcon');
	var expcon=document.getElementById('expcon');
	var contactcon=document.getElementById('contactcon');

	homecon.style.width='100%';
	homecon.style.height=window.innerHeight+'px';
	homecon.style.backgroundColor='#555';

	skillcon.style.width='100%';
	skillcon.style.height=window.innerHeight+'px';
	skillcon.style.backgroundColor='#444';

	expcon.style.width='100%';
	expcon.style.height=window.innerHeight+'px';
	expcon.style.backgroundColor='#333';

	contactcon.style.width='100%';
	contactcon.style.height=window.innerHeight+'px';
	contactcon.style.backgroundColor='#222';

}