class ctCanvas{
	canvas;
	context;
	objs=[];
	constructor(id){
		this.canvas = document.getElementById(id);
		this.context = this.canvas.getContext('2d');
		this.ct_onclick();
	}
	addObj(obj){
		this.objs.push(obj);
		obj.ctcanvas = this;
		obj.context = this.context;
		obj.draw();
	}
	ct_onclick(){
		var that = this;
		this.canvas.onclick=function(e){
			that.clickNotify(e);
		}
	}
	clickObservers = [];
	clickFunctions = [];
	clickNotify(e){
		var layerX = e.layerX;
		var layerY = e.layerY;
		for (var i = 0; i < this.clickObservers.length; i++){
			var obj = this.clickObservers[i];
			if(layerX>obj.x&&layerX<(obj.x+obj.w)&&layerY>obj.y&&layerY<(obj.y+obj.h)){
				this.clickFunctions[i].call(obj);
				
			}
		}
	}
	registerObserver(event,func,obj){
		if(event==='click'){
			this.clickObservers.push(obj);
			this.clickFunctions.push(func);
		}
	}
	removeObserver(event,func,obj){
		if(event==='click'){
			var index = this.clickObservers.indexOf(obj);
			if(index>=0){
				this.clickObservers.splice(index, 1);
				this.clickFunctions.splice(index, 1);
			}
		}
	}
}
class ctObj{
	context;
	ctcanvas;
	x;
	y;
	w;
	h;
	constructor(x?,y?,w?,h?){
		this.x = x||0;
		this.y = y||0;
		this.w = w||0;
		this.h = h||0;
	}
	clear(){

	}
	on(event,func){
		this.ctcanvas.registerObserver(event, func, this);
	}
	off(event,func){
		this.ctcanvas.removeObserver(event, func, this);
	}
}
class ctFillRect extends ctObj{
	fillStyle;
	constructor(x,y,w,h,fillStyle){
		super(x, y, w, h);
		this.fillStyle = fillStyle;
	}
	draw(){
		this.context.fillStyle = this.fillStyle;
		this.context.fillRect(this.x, this.y, this.w, this.h);
	}
}