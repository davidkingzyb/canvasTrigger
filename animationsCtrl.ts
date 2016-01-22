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
//  animation controler to control frame animation 
//  base on observe pattern and time-base animation register animation to animationCtrl 

// example

// window.onload=function(){
//     aC_startMainLoop();
//     var i=0;
//     var anmt=new animationCtrl();
//     anmt.start();
//     anmt.on(function(){
//         i++;
//         console.log(i);
//         if(i>2000){
//             anmt.stop();
//             aC_stopMainLoop();
//         }
//     },this);
// }

var aC_arr=[];
var aC_contextArr=[];
var aC_isMainLoopRuning=false;
var aC_During=0;

function aC_MainLoop(d){
    for(var i=0;i<aC_arr.length;i++){
        aC_arr[i].call(aC_contextArr[i],d-aC_During);
    }
    aC_During=d;
    if(aC_isMainLoopRuning){
        requestAnimationFrame(aC_MainLoop);
    }
}

var aC_currenttime=new Date().getTime();
function aC_MainLoopPolyFill(){
    var nowtime=new Date().getTime();
    for(var i=0;i<aC_arr.length;i++){
        aC_arr[i].call(aC_contextArr[i],nowtime-aC_currenttime);
    }
    aC_currenttime=nowtime;
    if(aC_isMainLoopRuning){
        setTimeout(aC_MainLoopPolyFill,16);
    }
    
}

function aC_startMainLoop(){
    aC_isMainLoopRuning=true;
    if(requestAnimationFrame){
        aC_MainLoop(16);
    }else{
        aC_MainLoopPolyFill();
    }
}

function aC_stopMainLoop(){
    aC_isMainLoopRuning=false;
}

class animationCtrl{
    constructor(){
    }
    loopArr=[];
    contextArr=[];
    acc=0;
    dt=16; // 1000/ fps 60
    loop(d){
        this.acc+=d;
        while(this.acc>=this.dt){
            for(var i=0;i<this.loopArr.length;i++){
                this.loopArr[i].call(this.contextArr[i]);
            }
            this.acc-=this.dt;
        }
    }
    start(){
        this.acc=0;
        this.loopArr=[];
        this.contextArr=[];
        this.register();
        
    }
    resume(){
        this.register();
    }
    pause(){
        this.unregister();
    }
    stop(){
        this.unregister();
        this.acc=0;
        this.loopArr=[];
        this.contextArr=[];
    }
    on(func,context){
        if(this.loopArr.indexOf(func)===-1){
            this.loopArr.push(func);
            this.contextArr.push(context);
        }
    }
    off(func,context){
        var index=this.loopArr.indexOf(func);
        if(index!==-1){
            this.loopArr.splice(index,1);
            this.contextArr.splice(index,1);
        }
    }
    register(){
        aC_arr.push(this.loop);
        aC_contextArr.push(this);
    }
    unregister(){
        var index=aC_arr.indexOf(this.loop);
        if(index!==-1){
            aC_arr.splice(index,1);
            aC_contextArr.splice(index,1);
        }
    }
}



