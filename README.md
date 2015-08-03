#canvasTrigger

**define object in canvas and dispatch canvas event to those object.**

2015/8/3 by DKZ



```
var ctcanvas=new ctCanvas('canvas');
ctcanvas.addTrigger('click');

var a=new ctFillRect(100,100,200,200,'#f00');
ctcanvas.addObj(a);

a.on('click',function(){
	console.log('a click');
});
```

##canvasTrigger API

###ctCanvas(id)

```
var ctcanvas=new ctCanvas('canvas');
```

####addTrigger(ctEvent)

```
ctcanvas.addTrigger('click');
```

####addObj(obj)

```
ctcanvas.addObj(a);
```

####removeObj(obj)

```
ctcanvas.removeObj(a);
```

####offObj(obj)

```
ctcanvas.offObj(obj);
```

####drawCanvas()

```
ctcanvas.drawCanvas();
```

####Notify(e,ctEvent)

####registerObserver(ctEvent,func,obj)

####removeObserver(ctEvent,obj)

###ctObj(x?,y?,w?,h?)

####on(ctevent,func)

```
a.on('click',function(){
	console.log('a click');
});
```

####off(ctevent)

```
a.off('click');
```

###ctFillRect(x,y,w,h,fillStyle)

extends ctObj

####draw()



