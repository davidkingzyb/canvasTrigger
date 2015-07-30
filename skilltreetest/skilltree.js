window.onload=function(){
	var ctcanvas=new ctCanvas('skilltree');
	var a=new ctFillRect(100,100,200,200,'#f00');
	ctcanvas.addObj(a);
	a.on('click',aclick);
	function aclick(){
		console.log('aaaaaaaaaa')
	}
	var b=new ctFillRect(100,200,50,50,'#0f0');
	ctcanvas.addObj(b);
	b.on('click',bclick);
	function bclick(){
		console.log('bbbbbbbb')
		a.off('click',aclick);
	}
};