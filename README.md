#canvasTrigger

**define objects in canvas and dispatch canvas event to those objects.**

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

create a ctCanvas object.

id:string <canvas>id

```
var ctcanvas=new ctCanvas('canvas');
```

####canvas:any

canvas object get by id.

####context:any

canvas context .

####objs:array<string>

ctObj objects array store ctObjs which add in this ctcanvas.

####triggers:array<string>

event type array store ctEvent string.

####addTrigger(ctEvent)

add event type to ctCanvas.

ctEvent:string event type.

```
ctcanvas.addTrigger('click');
```

####addObj(obj)

add ctObj to ctCanvas and draw it.

obj:ctObj

```
ctcanvas.addObj(a);
```

####removeObj(obj)

remove ctObj from ctCanvas remove all event of this ctObj and draw canvas again.

```
ctcanvas.removeObj(a);
```

####offObj(obj)

remove all event of this ctObj.

```
ctcanvas.offObj(obj);
```

####drawCanvas()

draw all ctObj objects in canvas.

```
ctcanvas.drawCanvas();
```

####Notify(e,ctEvent)

call observer's function

e:event 

ctEvent:string event type.

####registerObserver(ctEvent,func,obj)

register a observer 

ctEvent:string event type.

func:any this function will be execute after the event

obj:ctObj 

####removeObserver(ctEvent,obj)

remove observer from ctobj.

###ctObj(x?,y?,w?,h?)

super class of all object

####context:any

canvas context

####ctcanvas:ctCanvas

ctCanvas which contain this 

####x:number

x coordinate of this  default=0

####y:number

y coordinate of this  default=0

####w:number

width of this  default=100

####h:number

height of this  default=100

####alpha:number

alpha of this default=1

####on(ctevent,func)

add a event listener of this

ctevent:string 

func:function 

```
a.on('click',function(){
	console.log('a click');
});
```

####off(ctevent)

remove the event listener of this

ctevent:string

```
a.off('click');
```

####superdraw()

set globalAlpha

####to(args,time,callback)

a linear tween animation

args:object ctObj's attribute

time:number time during animation 

callback:function the callback function

```
obj.to({x:100,y:100,W:100,h:100,alpha:100},1000,function(){console.log('end')});
```

###animation(update,context,dt?fps?)

time base animation function

update:function animation function

dt:number step time

fps:number

```
var animate=animation(function(){
	obj.x++;
	if(obj.x>400){clearInterval(animate)};
},ctcanvas,20,50);
```

###ctFillRect(x,y,w,h,fillStyle)

extends ctObj 

a fill rect object

####fillStyle:string

context fillStyle default='#000'

```
var obj=new ctFillRext();
ctcanvas.addObj(obj);
```

####draw()

draw this object

###ctFillText

extends ctObj(text,font?,fillStyle?,x?,y?,w?,h?,alpha?)

a fill text object

####text:string 

text default=''

####font:string 

text style default='40px Arial'

```
var txt=new ctFillText('hello world');
ctcanvas.addObj(txt);
```

####fillStyle:string 

fill color default='#000'

####draw()

draw this obj


