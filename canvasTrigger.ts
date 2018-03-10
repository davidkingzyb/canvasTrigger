///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                      ________                                             //  
//                                                     |__    __|        __                                  //  
//   ______    ____    ______   __  __   ____    ______   |  |    __  __|__|  _____   _____   _____  __  __  //  
//  |   ___|  /    \  |      \ |  | | | /    \  /  ___/   |  |   |  |/_/|  | / _   | / _   | /  _  \|  |/_/  //  
//  |  |____ /  /   \_|   _   |\   \/ //  /   \_\___  \   |  |   |   |  |  |_\___  |_\___  |/  ____/|   |    //  
//  |_______|\_______/|__| |__| \____/ \_______/\_____/   |__|   |___|  |__|\______|\______|\______/|___|    //  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  2016/01/22 by DKZ https://davidkingzyb.github.io
//  github: https://github.com/davidkingzyb/canvasTrigger
//  guide: http://davidkingzyb.github.io/blogmd/6.html
//  api: https://github.com/davidkingzyb/canvasTrigger/blob/master/api.md
//  define objects in canvas and dispatch canvas event to those objects.
//  base on observe pattern 
//  debug and simple animation

// quick example

// var ctcanvas=new ctCanvas('canvas');
// ctcanvas.addTrigger('click');

// var a=new ctFillRect(100,100,200,200,'#f00');
// ctcanvas.addObj(a);

// a.on('click',function(){
// 	console.log('a click');
// });

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

	reset(){
		this.objs=[];
		for(var i=0;i<this.triggers.length;i++){
			this.resetTrigger(this.triggers[i]);
		}
		this.triggers=[];
		this.drawCanvas();
	}

	addObj(obj){
		this.objs.push(obj);
		obj.ctcanvas = this;
		obj.context = this.context;
		obj.draw();
	}

	addObjs(objarr){
		for(var i=0;i<objarr.length;i++){
			this.addObj(objarr[i]);
		}
	}

	removeObj(obj){
		var index = this.objs.indexOf(obj);
		if(index>=0){
			this.objs.splice(index, 1);
		}
		this.offObj(obj);
		this.drawCanvas();
	}

	removeObjs(objarr){
		for(var i=0;i<objarr.length;i++){
			this.removeObj(objarr[i]);
		}
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
		if(this.triggers.indexOf(ctEvent)===-1){
			this.triggers.push(ctEvent);
			this[ctEvent + 'Observers'] = [];
			this[ctEvent + 'Functions'] = [];
			var that = this;
			this.canvas['on'+ctEvent]=function(e){
				that.Notify(e, ctEvent);
			};
		}
		
	}

	resetTrigger(ctEvent){
		this[ctEvent + 'Observers'] = [];
		this[ctEvent + 'Functions'] = [];
		var that = this;
		this.canvas['on'+ctEvent]=function(e){
			that.Notify(e, ctEvent);
		};
	}

	Notify(e,ctEvent){
		var layerX = e.layerX;
		var layerY = e.layerY;
		for (var i = 0; i < this[ctEvent+'Observers'].length; i++){
			var obj = this[ctEvent+'Observers'][i];
			if(layerX>obj.x&&layerX<(obj.x+obj.w)&&layerY>obj.y&&layerY<(obj.y+obj.h)){
				this[ctEvent+'Functions'][i].call(obj,e);	
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
	alpha;
	constructor(x?,y?,w?,h?,alpha?){
		this.x = x||0;
		this.y = y||0;
		this.w = w||100;
		this.h = h||100;
		this.alpha=alpha||1;
	}
	superdraw(){
		this.context.globalAlpha=this.alpha;
	}
	on(ctevent,func){
		this.ctcanvas.registerObserver(ctevent, func, this);
	}
	off(ctevent){
		this.ctcanvas.removeObserver(ctevent,this);
	}
}

//============debug==============

function cT_showPosition(target,ctcanvas){
		ctcanvas.addTrigger('mousemove');
		ctcanvas.addTrigger('mousedown');
		ctcanvas.addTrigger('mouseup');
		var coordinate = new ctFillText('[' + target.x + ',' + target.y + ']', '3px Arial', '#f00', target.x, target.y);
		ctcanvas.addObj(coordinate);
		var border = new ctStrokeRect('#f00', 1, target.x, target.y, target.w, target.h);
		ctcanvas.addObj(border);
		var startX;
        var startY;
        var targetStartX;
        var targetStartY;
        var ismove = false;
		target.on('mousedown',function(e){
			targetStartX = target.x;
			targetStartY = target.y;
			startX = e.layerX;
			startY = e.layerY;
			ismove = true;
			console.log('x','y','width','height');
		})
		target.on('mousemove',function(e){
			if(ismove){
				target.x=Math.ceil(targetStartX+(e.layerX - startX));
            	target.y=Math.ceil(targetStartY+(e.layerY - startY));
            	coordinate.text='['+parseInt(target.x)+','+parseInt(target.y)+']';
            	coordinate.x=target.x;
            	coordinate.y=target.y;
            	border.x=target.x;
            	border.y=target.y;
            	ctcanvas.drawCanvas();
			}
		})
		target.on('mouseup',function(e){
			ismove = false;
			console.log(target.x,target.y,target.w,target.h);
		})
}

function cT_showPositions(targetarr,ctcanvas){
	for(var i=0;i<targetarr.length;i++){
		cT_showPosition(targetarr[i],ctcanvas);
	}
}

//===========obj=================

class ctFillRect extends ctObj{
	fillStyle;
	constructor(fillStyle?,x?,y?,w?,h?,alpha?){
		super(x,y,w,h,alpha);
		this.fillStyle = fillStyle||'#000';
	}
	draw(){
		this.superdraw();
		this.context.fillStyle = this.fillStyle;
		this.context.fillRect(this.x, this.y, this.w, this.h);
	}
}

class ctStrokeRect extends ctObj{
	strokeStyle;
	lineWidth;
	constructor(strokeStyle?,lineWidth?,x?,y?,w?,h?,alpha?){
		super(x,y,w,h,alpha);
		this.strokeStyle=strokeStyle||'#f00';
		this.lineWidth=lineWidth||1;
	}
	draw(){
		this.superdraw();
		this.context.strokeStyle=this.strokeStyle;
		this.context.lineWidth=this.lineWidth;
		this.context.strokeRect(this.x,this.y,this.w,this.h);
	}
}

class ctFillText extends ctObj{
	text;
	font;
	fillStyle;
	constructor(text,font?,fillStyle?,x?,y?,w?,h?,alpha?,rotation?){
		super(x,y,w,h,alpha);
		this.text=text||'';
		this.font=font||'40px Arial';
		this.fillStyle=fillStyle||'#000';
	}
	draw(){
		this.superdraw();
		this.context.fillStyle=this.fillStyle;
		this.context.font=this.font;
		this.context.fillText(this.text,this.x,this.y);
	}
}

class ctDrawImg extends ctObj{
	img;
	sx;
	sy;
	sw;
	sh;
	constructor(img,x?,y?,w?,h?,alpha?,sx?,sy?,sw?,sh?){
		super(x,y,img.width,img.height,alpha);
		this.img=img;
		this.sx=sx||0;
		this.sy=sy||0;
		this.sw=sw||img.width;
		this.sh=sh||img.height;
	}
	draw(){
		this.superdraw();
		this.context.drawImage(this.img,this.sx,this.sy,this.sw,this.sh,this.x,this.y,this.w,this.h);
	}
}

class ctLine extends ctObj{
	strokeStyle;
	lineWidth;
	sx;
	sy;
	ex;
	ey;
	constructor(strokeStyle,sx,sy,ex,ey,lineWidth?,alpha?){
		super(1,1,1,1,alpha);
		this.strokeStyle=strokeStyle;
		this.sx=sx;
		this.sy=sy;
		this.ex=ex;
		this.ey=ey;
		this.lineWidth=lineWidth||2;
	}
	draw(){
		this.superdraw();
		this.context.beginPath();
		this.context.strokeStyle=this.strokeStyle;
		this.context.lineWidth=this.lineWidth;
		this.context.moveTo(this.sx,this.sy);
		this.context.lineTo(this.ex,this.ey);
		this.context.stroke();
		this.context.closePath();
	}
}
