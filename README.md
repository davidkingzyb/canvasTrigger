# canvasTrigger

**define objects in canvas and dispatch canvas event to those objects.**

2015/8/3 by DKZ update 2018/3/12

[api](./api.md)

[demo](http://davidkingzyb.github.io/canvasTrigger/demo/index.html)

## Quick Start

### canvasTigger

define objects in canvas and dispatch canvas event to those objects

```
var ctcanvas = new ctCanvas('ct');
ctcanvas.addTrigger('click');

var a = new ctFillRect('#f00', 100, 100, 200, 200);
ctcanvas.addObj(a);

a.on('click', function() {
    console.log('a click');
});
```

### ctAnimation

Animation controler to control frame animation

```
var i=0;
function loop(){
    i++;
    console.log(i);
    if(i>1000){
        ctAnimation.off(loop,this);
        ctAnimation.stop();
        ctAnimation.reset();
    }
}
ctAnimation.on(loop,this);
ctAnimation.start();
```

### ctPlaySound

Sound player use HTML5 audio  

```
ctPlaySound.loadsound('s2a');
ctPlaySound.play('s2a');
```

### ctBarChart

Bar Chart

```
var barchart = new ctBarChart('barchart', '测试数据(int)');
barchart.concatData([{
    'name':'test1',
    'num':10
},{
    'name':'test2',
    'num':20
}])
```














