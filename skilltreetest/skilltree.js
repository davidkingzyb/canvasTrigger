window.onload=function(){
	var ctcanvas=new ctCanvas('skilltree');
	ctcanvas.addTrigger('click');
	ctcanvas.addTrigger('mousemove');

	var a=new ctFillRect(100,100,200,200,'#f00');
	ctcanvas.addObj(a);
	a.on('click',aclick);
	a.on('mousemove',function(){
		console.log('amousemove');
	});
	function aclick(){
		console.log('aaaaaaaaaa')
		a.x+=5;
		ctcanvas.drawCanvas();
	}
	var b=new ctFillRect(100,200,50,50,'#0f0');
	ctcanvas.addObj(b);
	b.on('click',bclick);
	function bclick(){
		console.log('bbbbbbbb')
		ctcanvas.removeObj(a);
	}
};