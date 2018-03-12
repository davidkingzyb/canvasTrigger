///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                      ________                                             //  
//                                                     |__    __|        __                                  //  
//   ______    ____    ______   __  __   ____    ______   |  |    __  __|__|  _____   _____   _____  __  __  //  
//  |   ___|  /    \  |      \ |  | | | /    \  /  ___/   |  |   |  |/_/|  | / _   | / _   | /  _  \|  |/_/  //  
//  |  |____ /  /   \_|   _   |\   \/ //  /   \_\___  \   |  |   |   |  |  |_\___  |_\___  |/  ____/|   |    //  
//  |_______|\_______/|__| |__| \____/ \_______/\_____/   |__|   |___|  |__|\______|\______|\______/|___|    //  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  2018/3/12 by DKZ https://davidkingzyb.github.io
//  github: https://github.com/davidkingzyb/canvasTrigger
//  guide: http://davidkingzyb.github.io/blogmd/6.html
//  api: https://github.com/davidkingzyb/canvasTrigger/blob/master/api.md

class ctAnimation {
    constructor() {

    }

    static FRAME_TIME=16;// 1000ms/60fps
    static main_arr = [];
    static main_context_arr = [];
    static main_is_running= false;
    static main_during = 0;
    static currenttime = new Date().getTime();
    static acc=0;

    static mainLoop(d) {
        ctAnimation.acc=ctAnimation.acc+ d - ctAnimation.main_during
        while (ctAnimation.acc >= ctAnimation.FRAME_TIME) {
            for (var i = 0; i < ctAnimation.main_arr.length; i++) {
                ctAnimation.main_arr[i].call(ctAnimation.main_context_arr[i]);
            }
            ctAnimation.acc-=ctAnimation.FRAME_TIME;
        }
        ctAnimation.main_during = d;
        if (ctAnimation.main_is_running) {
            requestAnimationFrame(ctAnimation.mainLoop);
        }
    }

    static mainLoopPolyFill() {
        var nowtime = new Date().getTime();
        for (var i = 0; i < ctAnimation.main_arr.length; i++) {
            ctAnimation.main_arr[i].call(ctAnimation.main_context_arr[i], nowtime - ctAnimation.currenttime);
        }
        ctAnimation.currenttime = nowtime;
        if (ctAnimation.main_is_running) {
            setTimeout(ctAnimation.mainLoopPolyFill, ctAnimation.FRAME_TIME);
        }
    }

    static start() {
        ctAnimation.currenttime=new Date().getTime();
        ctAnimation.main_is_running = true;
        if (requestAnimationFrame) {
            ctAnimation.mainLoop(ctAnimation.FRAME_TIME);
        } else {
            ctAnimation.mainLoopPolyFill();
        }
    }

    static stop() {
        ctAnimation.main_is_running = false;
    }

    static reset(){
        ctAnimation.stop();
        ctAnimation.main_arr = [];
        ctAnimation.main_context_arr = [];
        ctAnimation.main_is_running= false;
        ctAnimation.main_during = 0;
        ctAnimation.currenttime = new Date().getTime();
        ctAnimation.acc=0;
    }

    static on(func, context) {
        if (ctAnimation.main_arr.indexOf(func) === -1) {
            ctAnimation.main_arr.push(func);
            ctAnimation.main_context_arr.push(context);
        }
    }
    static off(func, context) {
        var index = ctAnimation.main_arr.indexOf(func);
        if (index !== -1) {
            ctAnimation.main_arr.splice(index, 1);
            ctAnimation.main_context_arr.splice(index, 1);
        }
    }

}

export {ctAnimation}
