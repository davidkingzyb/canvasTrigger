//=============core=================

class ctCanvas{
	canvas;
	context;
	objs=[];
	triggers = [];

	constructor(id){
		this.canvas = document.getElementById(id);
		this.context = this.canvas.getContext('2d');
	}

	addObj(obj){
		this.objs.push(obj);
		obj.ctcanvas = this;
		obj.context = this.context;
		obj.draw();
	}

	removeObj(obj){
		var index = this.objs.indexOf(obj);
		if(index>=0){
			this.objs.splice(index, 1);
		}
		this.offObj(obj);
		this.drawCanvas();
	}

	offObj(obj){
		for (var i = 0; i < this.triggers.length;i++){
			this.removeObserver(this.triggers[i], obj);
		}
	}

	drawCanvas(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (var i = 0; i < this.objs.length;i++){
			this.objs[i].draw();
		}
	}

	addTrigger(ctEvent){
		this.triggers.push(ctEvent);
		this[ctEvent + 'Observers'] = [];
		this[ctEvent + 'Functions'] = [];
		var that = this;
		this.canvas['on'+ctEvent]=function(e){
			that.Notify(e, ctEvent);
		}
	}

	Notify(e,ctEvent){
		var layerX = e.layerX;
		var layerY = e.layerY;
		for (var i = 0; i < this[ctEvent+'Observers'].length; i++){
			var obj = this[ctEvent+'Observers'][i];
			if(layerX>obj.x&&layerX<(obj.x+obj.w)&&layerY>obj.y&&layerY<(obj.y+obj.h)){
				this[ctEvent+'Functions'][i].call(obj);
				
			}
		}
	}

	registerObserver(ctEvent,func,obj){
		this[ctEvent+'Observers'].push(obj);
		this[ctEvent+'Functions'].push(func);
	}

	removeObserver(ctEvent,obj){	
		var index = this[ctEvent+'Observers'].indexOf(obj);
		if(index>=0){
			this[ctEvent+'Observers'].splice(index, 1);
			this[ctEvent+'Functions'].splice(index, 1);
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
	on(ctevent,func){
		this.ctcanvas.registerObserver(ctevent, func, this);
	}
	off(ctevent){
		this.ctcanvas.removeObserver(ctevent,this);
	}
}

//===========obj=================

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

//==========animation=============

function animation(update,context){
	var current = new Date().getTime();
	var acc = 0;
	var dt = 20;
	var fps = 50;
	var time = Math.ceil(1000/this.fps);
	function loop() {
        var now = new Date().getTime();
        var passed= now - current; 
        current = now;
        acc+=passed;
        while(acc>=dt){
			update();
			acc-=dt;
        }
        context.drawCanvas();
    }
	return setInterval(loop, time);
}