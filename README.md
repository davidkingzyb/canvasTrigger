# canvasTrigger

**define objects in canvas and dispatch canvas event to those objects.**

2015/8/3 by DKZ update 2016/1/22



[guide](http://davidkingzyb.github.io/blogmd/6.html)

[api](./api.md)

[demo](./demo/chart/chart.html)

### List

- **[canvasTrigger](#canvastrigger-1)** define objects in canvas and dispatch canvas event to those objects.

- **[animationCtrl](#animationctrl)** nimation controler to control frame animation

- [**playsound.js**](#playsoundjs) sound player

### quick example

#### canvasTigger

```
    var ctcanvas=new ctCanvas('canvas');
    ctcanvas.addTrigger('click');

    var a=new ctFillRect(100,100,200,200,'#f00');
    ctcanvas.addObj(a);

    a.on('click',function(){
    	console.log('a click');
    });
```

#### animationCtrl

```
    aC_startMainLoop();
    var i=0;
    var anmt=new animationCtrl();
    anmt.start();
    anmt.on(function(){
        i++;
        console.log(i);
        if(i>2000){
            anmt.stop();
            aC_stopMainLoop();
        }
    },this);

```

#### playsound.js

```
    playsound.loadsound('bgm');
    playsound.play('bgm');
```
















