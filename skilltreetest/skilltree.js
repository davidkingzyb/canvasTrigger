window.onload=function(){
	var ctcanvas=new ctCanvas('skilltree');
	ctcanvas.addTrigger('click');
	ctcanvas.addTrigger('mousemove');

	var a=new ctFillRect();
	ctcanvas.addObj(a);
	a.on('click',aclick);
	amousein=false;
	a.on('mousemove',function(e){
		if(!amousein){
			console.log('amousein');
			amousein=true;
		}
		if(amousein){
			if(e.layerX<a.x+10||e.layerX>a.x+a.w-10||e.layerY<a.y+10||e.layerY>a.y+a.h-10){
				console.log('amouseout');
				amousein=false;
			}
		}
	});
	function aclick(){
		console.log('aaaaaaaaaa')
		a.x+=5;
		ctcanvas.drawCanvas();
	}
	var b=new ctFillRect('#0f0',100,200,50,50,.5);
	ctcanvas.addObj(b);
	b.on('click',bclick);
	function bclick(){
		console.log('bbbbbbbb')
		ctcanvas.removeObj(a);
	}

	//var aaaaa=animationRequestAnimationFrame(function(){a.x++},ctcanvas);
	//clearInterval(aaaaa)
	//var bbbbb=animation(function(){b.x++;if(b.x>400){clearInterval(bbbbb)}},ctcanvas,20,50);
	//var bbbbb=animationRequestAnimationFrame(function(){b.x++;if(b.x>400){cancelAnimationFrame(bbbbb);}},ctcanvas);
	b.to({x:-50,alpha:.1,y:0,w:100},1000,function(){console.log('tofinish')});
	var txt=new ctFillText('ttt','40px Arial','#f00',200,100);
	ctcanvas.addObj(txt);
};
