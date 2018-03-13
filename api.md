# canvasTrigger

**define objects in canvas and dispatch canvas event to those objects.**

2015/8/3 by DKZ update 2018/3/12

## canvasTrigger

define objects in canvas and dispatch canvas event to those objects.

### ctCanvas(id) class

- id &lt;string&gt; canvas element id

#### reset() &lt;void&gt;

#### addObj(obj) &lt;void&gt;
- obj &lt;ctObj&gt;

#### removeObj(obj) &lt;void&gt;
- obj &lt;ctObj&gt;

#### addObjs(objarr) &lt;void&gt;
- objarr [&lt;ctObj&gt;]

#### removeObjs(objarr) &lt;void&gt;
- objarr [&lt;ctObj&gt;]

#### offObj(obj) &lt;void&gt;
- obj &lt;ctObj&gt;

#### drawCanvas() &lt;void&gt;

#### addTrigger(ctEvent) &lt;void&gt;
- ctEvent &lt;string&gt; 'click' 'mouseup' ...

#### resetTrigger(ctEvent) &lt;void&gt;
- ctEvent &lt;string&gt; 'click' 'mouseup' ...

### ctObj(x?,y?,w?,h?,alpha?) class

- x &lt;int&gt; default 0
- y &lt;int&gt; default 0
- w &lt;int&gt; default 100 width
- h &lt;int&gt; default 100 height
- alpha &lt;number&gt; default 1

#### on(ctEvent,func) &lt;void&gt;
- ctEvent &lt;string&gt; 'click' mush addTrigger firsh
- func &lt;function&gt; callback function

#### off(ctEvent) &lt;void&gt;
- ctEvent &lt;string&gt;

### cT_showPosition(target,ctcanvas) &lt;void&gt;
- target &lt;ctObj&gt;
- ctcanvas &lt;ctCanvas&gt;

### cT_showPositions(targetarr,ctcanvas) &lt;void&gt;
- targetarr [&lt;ctObj&gt;]
- ctcanvas &lt;ctCanvas&gt;

### ctFillRect(fillStyle?,x?,y?,w?,h?,alpha?) class extend ctObj
- fillStyle &lt;string&gt; default '#000'

### ctStrokeRect(strokeStyle?,lineWidth?,x?,y?,w?,h?,alpha?) class extend ctObj
- strokeStyle &lt;string&gt; default '#f00'
- lineWidth &lt;int&gt; default 1

### ctFillText(text,font?,fillStyle?,x?,y?,w?,h?,alpha?) class extend ctObj
- text &lt;string&gt;
- font &lt;string&gt; default '40px Arial'
- fillStyle &lt;string&gt; default '#000'

### ctDrawImg(img,x?,y?,w?,h?,alpha?,sx?,sy?,sw?,sh?) class extend ctObj
- img &lt;Image&gt;
- sx &lt;int&gt; default 0 start x
- sy &lt;int&gt; default 0 start y
= sw &lt;int&gt; default img.width
= sh &lt;int&gt; default img.height

### ctLine(strokeStyle,sx,sy,ex,ey,lineWidth?,alpha?) class extend ctObj
- strokeStyle &lt;string&gt;
- sx &lt;int&gt; start x
- sy &lt;int&gt; start y
- ex &lt;int&gt; end x
- ex &lt;int&gt; end y
- lineWidth &lt;int&gt; default 2

### ctFillCircle(fillStyle?,ox?,oy?,r?,alpha?) class extend ctObj
- fillStyle &lt;string&gt; default '#000'
- ox &lt;int&gt; default 50 center of circle x
- oy &lt;int&gt; default 50 center of circle y
- r &lt;int&gt; default 50 radius

***

### ctAnimation() static class

Animation controler to control frame animation

- FRAME_TIME static &lt;int&gt; default 16 1000ms/60fps

#### start() &lt;void&gt;

#### stop() &lt;void&gt;

#### reset() &lt;void&gt;

#### on(func,that) &lt;void&gt;
register animation function on loop
- func &lt;function&gt; 
- that &lt;context&gt;

#### off(func,context) &lt;void&gt;
unregister animation function off loop
- func &lt;function&gt; 
- that &lt;context&gt;

***

### ctPlaySound() static class

Sound player use HTML5 audio  

- path &lt;string&gt; default './'
- type &lt;string&gt; default '.mp3' file type
- volume &lt;number&gt; default 0.5

#### loadsound(name) &lt;audio&gt;
load sound file
- name &lt;string&gt; file name

#### play(name) &lt;void&gt;
- name &lt;string&gt; file name

#### pause(name) &lt;void&gt;
- name &lt;string&gt; file name

#### replay(name) &lt;void&gt;
- name &lt;string&gt; file name

#### stop(name) &lt;void&gt;
- name &lt;string&gt; file name

#### onloop(name) &lt;void&gt;
loop forever
- name &lt;string&gt; file name

#### offloop(name) &lt;void&gt;
stop loop
- name &lt;string&gt; file name

#### loop(name,times) &lt;void&gt;
loop some times
- name &lt;string&gt; file name
- times &lt;int&gt; loop times

***

### ctBarChart(id,title='') class

Bar Chart

- id &lt;string&gt; canvas element id
- title &lt;string&gt; default title

- canvas &lt;ctCanvas&gt; 

#### concatData(datalist)

- datalist [{'name':&lt;string&gt;,'num':&lt;int&gt;},]
