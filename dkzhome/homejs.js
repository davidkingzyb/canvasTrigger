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

}
function scrollToAnimate(y){
	window.scrollTo(0,y);
}
function setHomeWH(){
	var homecon=document.getElementById('homecon');
	var skillcon=document.getElementById('skillcon');
	var expcon=document.getElementById('expcon');
	var contactcon=document.getElementById('contactcon');

	homecon.style.width='100%';
	homecon.style.height=window.innerHeight+'px';
	homecon.style.backgroundColor='red';

	skillcon.style.width='100%';
	skillcon.style.height=window.innerHeight+'px';
	skillcon.style.backgroundColor='yellow';

	expcon.style.width='100%';
	expcon.style.height=window.innerHeight+'px';
	expcon.style.backgroundColor='green';

	contactcon.style.width='100%';
	contactcon.style.height=window.innerHeight+'px';
	contactcon.style.backgroundColor='blue';

}