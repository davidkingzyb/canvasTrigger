class ctCanvas{
	canvas;
	context;
	objs;
	constructor(id){
		this.canvas = document.getElementById(id);
		this.context = this.canvas.getContext('2d');
		this.ct_onclick();
	}
	addObj(obj){
		this.objs.push(obj);
		obj.context = this;
		obj.draw();
	}
	ct_onclick(){
		this.canvas.onclick=function(e){
			this.clickNotify(e);
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
				var func = this.clickFunctions[i];
				obj.func;
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
	onTrigger(event,func){
		this.context.registerObserver(event, func, this);
	}
	offTrigger(event,func){
		this.context.removeObserver(event, func, this);
	}
}
class ctRect extends ctObj{
	constructor(x?,y?,w?,h?){
		super(x, y, w, h);
	}
	draw(){
		this.context.
	}
}