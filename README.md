#canvasTrigger

**define objects in canvas and dispatch canvas event to those objects.**

2015/8/3 by DKZ update 2015/8/18



[github](https://github.com/davidkingzyb/canvasTrigger)

##quick example

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

***

create a ctCanvas object.

id:string <canvas>id

```
var ctcanvas=new ctCanvas('canvas');
```

##### canvas:any

canvas object get by id.

##### context:any

canvas context .

##### objs:array<string>

ctObj objects array store ctObjs which add in this ctcanvas.

##### triggers:array<string>

event type array store ctEvent string.

##### addTrigger(ctEvent)

add event type to ctCanvas.

ctEvent:string event type.

```
ctcanvas.addTrigger('click');
```

##### addObj(obj)

add ctObj to ctCanvas and draw it.

obj:ctObj

```
ctcanvas.addObj(a);
```

##### removeObj(obj)

remove ctObj from ctCanvas remove all event of this ctObj and draw canvas again.

```
ctcanvas.removeObj(a);
```

##### offObj(obj)

remove all event of this ctObj.

```
ctcanvas.offObj(obj);
```

##### drawCanvas()

draw all ctObj objects in canvas.

```
ctcanvas.drawCanvas();
```

##### Notify(e,ctEvent)

call observer's function

e:event 

ctEvent:string event type.

##### registerObserver(ctEvent,func,obj)

register a observer 

ctEvent:string event type.

func:any this function will be execute after the event

obj:ctObj 

##### removeObserver(ctEvent,obj)

remove observer from ctobj.

###ctObj(x?,y?,w?,h?)

***

super class of all object

##### context:any

canvas context

##### ctcanvas:ctCanvas

ctCanvas which contain this 

##### x:number

x coordinate of this  default=0

##### y:number

y coordinate of this  default=0

##### w:number

width of this  default=100

##### h:number

height of this  default=100

##### alpha:number

alpha of this default=1

##### on(ctevent,func)

add a event listener of this

ctevent:string 

func:function 

```
a.on('click',function(){
	console.log('a click');
});
```

##### off(ctevent)

remove the event listener of this

ctevent:string

```
a.off('click');
```

##### superdraw()

set globalAlpha

##### to(args,time,callback)

a linear tween animation

args:object ctObj's attribute

time:number time during animation 

callback:function the callback function

```
obj.to({x:100,y:100,W:100,h:100,alpha:100},1000,function(){
	console.log('end');
});
```

###animation(update,context,dt?fps?)

***

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

###showPosition(target,ctcanvas)

***

show ctObj position and make it dragable

target:ctObj 

target object

ctcanvas:ctCanvas 

```
showPosition(a,ctcanvas);
```

###ctFillRect(fillStyle?,x?,y?,w?,h?,alpha?)

***

extends ctObj 

a fill rectangle object

```
var obj=new ctFillRext();
ctcanvas.addObj(obj);
```

##### fillStyle:string

context fillStyle default='#000'

##### draw()

draw this object

###ctStrokeRect(strokeStyle?,lineWidth?,x?,y?,w?,h?,alpha?)

***

stroke rectangle object

```
var strokerect =new ctStrokeRect('#f00',1,50,50,50,50,1);
```

##### strokeStyle:string 

context strokeStyle default='#f00'

##### lineWidth:number 

context lineWidth default=1

##### draw()

draw this object

###ctFillText(text,font?,fillStyle?,x?,y?,w?,h?,alpha?)

***

extends ctObj

a fill text object

```
var txt=new ctFillText('hello world');
ctcanvas.addObj(txt);
```

##### text:string 

text default=''

##### font:string 

text style default='40px Arial'

##### fillStyle:string 

fill color default='#000'

##### draw()

draw this obj

###ctDrawImg(img,x?,y?,w?,h?,alpha?,sx?,sy?,sw?,sh?)

***

extends ctObj

Image object

```
var skillheadimg=new Image();
skillheadimg.src='res/img/skillhead.png';	
skillheadimg.onload=function(){
	skillhead=new ctDrawImg(skillheadimg,225,225);
	ctcanvas.addObj(skillhead);
}
```

##### img:Image

sourse image texture 

##### sx:number,sy:number,sw:number,sh:number

x y coordination and width height of the sourse image.default = 0,0,img.width,img.height

##### draw()

draw image

###ctLine(strokeStyle,sx,sy,ex,ey,lineWidth?,alpha?)

***

extends ctObj

line obj (can not use trigger)

```
var line=new ctLine(skillnode.fillStyle,x||300,y||300,skillnode.x+30,skillnode.y+30,2,0.01);
```

##### strokeStyle:string

strokeStyle

##### lineWidth:number

line width default=2

##### sx:number,sy:number,ex:number,ey:number

start x,start y,end x,end y coodination

##### draw()

draw line

###ctFillCircle(fillStyle?,ox?,oy?,r?,alpha?)

***

extends ctObj

circle object

```
var circle=new ctFillCircle();
```

##### fillStyle:string 

fill color default='#000'

##### ox:number 

center of the circle coordinate x default=50

##### oy:number 

center of the circle coordinate y default=50

##### r:number 

radius of the circle default=50

##### alpha:number 

default=1

##### draw()

draw circle

###ctFillArc(fillStyle?,ox?,oy?,r?,sangle?,eangle?,alpha?,clockwise?)

***

extends ctObj

```
var fillarc=new ctFillArc('#000',50,50,50,30,180,1,true);
```

##### fillStyle:string 

fill color default='#000'

##### ox:number 

center of the circle coordinate x default=50

##### oy:number 

center of the circle coordinate y default=50

##### r:number 

radius of the circle default=50

##### alpha:number 

default=1

##### sangle:number

start angle default=0

##### eangle:number

end angle default=Math.PI*2

##### clockwise:boolean

default=true

##### draw()

draw this object

###ctStrokeArc(strokeStyle,lineWidth?,ox?,oy?,r?,sangle?,eangle?,alpha?,clockwise?)

***

extends ctObj

stroke arc

```
var linearc=new ctStrokeArc('#574498',2,300,300,105,90,180,0.01);
```

##### strokeStyle:string

stroke style 

##### lineWidth:number

line width default=2

##### ox,oy,r,sangle,eangle:number

same like ctFillArc

##### draw()

draw ctStrokeArc












