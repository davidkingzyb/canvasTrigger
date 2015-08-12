window.onload=function(){
	var ctcanvas=new ctCanvas('skilltree');
	ctcanvas.addTrigger('click');
	var bg=new ctFillRect('#222',0,0,700,600);
	ctcanvas.addObj(bg);

	var core=new ctFillCircle('#000',300,300,75);
	var core1=new ctFillCircle('#aaa',300,300,160,.1);
	var core2=new ctFillCircle('#aaa',300,300,250,.1);
	var arc1=new skillArc('#f00',0,270,90);
	var arc2=new skillArc('#0f0',30,90,70);
	var node=new skillNode('JS','#00f');
	var node2=new skillNode('TypeScript','#0f0');
	
	



	var group=[core,core1,core2,arc2,arc1,node,node2];
	ctcanvas.addObjs(group);
	//showPosition(node,ctcanvas);
	node.on('click',function(){
		node.r=30;
		ctcanvas.drawCanvas();
	})
	showPosition(node2,ctcanvas);
};
