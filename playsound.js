/*

license:MIT

Copyright (c) 2016 DKZ

Permission is hereby granted, free of charge, to any person obtaining 
a copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software 
is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included 
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION 
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

==============================================================================================================================
 __    __                   ________                          ________                                                        
|  |  |  |                 |__    __|                   __   |   _____|                           _      __                   
|  |/\|  |  _____  ___        |  |     _____    _____  |  |  |  |____   __  __  ______   ______  | \_   |__|  _____   ______  
|        | /  _  \|   |___    |  |    /     \  /     \ |  |  |   ____| |  | | ||      \ |   ___| |   _| |  | /     \ |      \ 
|   /\   |/  ____/|  ___  |   |  |   |   o   ||   o   ||  |_ |  |      |  |_| ||   _   ||  |____ |  |___|  ||   o   ||   _   |
|__/  \__|\______/|_______|   |__|    \_____/  \_____/ |____||__|      |______||__| |__||_______|\_____/|__| \_____/ |__| |__|
==============================================================================================================================
2016/07/21 by DKZ https://davidkingzyb.github.io
github: https://github.com/davidkingzyb/WebToolFunction
*/

var playsound = (function() {
    function playsound() {};
    playsound.path = './';
    playsound.type = '.mp3';
    playsound.volume = 0.5;
    playsound.audios = {};

    playsound.loadsound = function(name) {
        if (window['Audio']) {
            var audio = new Audio(playsound.path + name + playsound.type);
            audio.id = 'ps_' + name;
            audio.volume = playsound.volume;
            playsound.audios[name] = audio;
            return audio;
        } else {
            return null;
        }
    }

    playsound.play = function(name) {
        playsound.audios[name].play();
    }

    playsound.pause = function(name) {
        playsound.audios[name].pause();
    }

    playsound.stop = function(name) {
        playsound.audios[name].pause();
        playsound.audios[name].currentTime = 0;
    }

    playsound.replay=function(name){
        playsound.audios[name].currentTime = 0;
        playsound.audios[name].play();
    }

    playsound._replay=function(){
        this.currentTime = 0;
        this.play();
    }

    playsound.onloop = function(name) {
        playsound.audios[name].addEventListener('ended',playsound._replay, false);
    }

    playsound.offloop=function(name){
        playsound.audios[name].removeEventListener('ended',playsound._replay)
    }

    playsound.loop=function(name,times){
        times--;
        playsound.audios[name].play();
        playsound.audios[name].addEventListener('ended',function(){
            if(times>0){
                this.currentTime=0;
                this.play();
                times--;
            }  
        }, false);
    }


    return playsound;
})()