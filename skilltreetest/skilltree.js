window.onload=function(){
	var ctcanvas=new ctCanvas('skilltree');
	var bg=new ctFillRect('#222',0,0,700,600);
	ctcanvas.addObj(bg);
	var core=new ctFillCircle('#000',300,300,75);
	var core1=new ctFillCircle('#aaa',300,300,160,.1);
	var core2=new ctFillCircle('#aaa',300,300,250,.1);
	ctcanvas.addObj(core2);
	ctcanvas.addObj(core1);
	ctcanvas.addObj(core);
};
