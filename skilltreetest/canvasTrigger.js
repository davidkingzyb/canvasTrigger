//=============core=================
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ctCanvas = (function () {
    function ctCanvas(id) {
        this.objs = [];
        this.triggers = [];
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext('2d');
    }
    ctCanvas.prototype.addObj = function (obj) {
        this.objs.push(obj);
        obj.ctcanvas = this;
        obj.context = this.context;
        obj.draw();
    };
    ctCanvas.prototype.removeObj = function (obj) {
        var index = this.objs.indexOf(obj);
        if (index >= 0) {
            this.objs.splice(index, 1);
        }
        this.offObj(obj);
        this.drawCanvas();
    };
    ctCanvas.prototype.offObj = function (obj) {
        for (var i = 0; i < this.triggers.length; i++) {
            this.removeObserver(this.triggers[i], obj);
        }
    };
    ctCanvas.prototype.drawCanvas = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0; i < this.objs.length; i++) {
            this.objs[i].draw();
        }
    };
    ctCanvas.prototype.addTrigger = function (ctEvent) {
        this.triggers.push(ctEvent);
        this[ctEvent + 'Observers'] = [];
        this[ctEvent + 'Functions'] = [];
        var that = this;
        this.canvas['on' + ctEvent] = function (e) {
            that.Notify(e, ctEvent);
        };
    };
    ctCanvas.prototype.Notify = function (e, ctEvent) {
        var layerX = e.layerX;
        var layerY = e.layerY;
        for (var i = 0; i < this[ctEvent + 'Observers'].length; i++) {
            var obj = this[ctEvent + 'Observers'][i];
            if (layerX > obj.x && layerX < (obj.x + obj.w) && layerY > obj.y && layerY < (obj.y + obj.h)) {
                this[ctEvent + 'Functions'][i].call(obj, e);
            }
        }
    };
    ctCanvas.prototype.registerObserver = function (ctEvent, func, obj) {
        this[ctEvent + 'Observers'].push(obj);
        this[ctEvent + 'Functions'].push(func);
    };
    ctCanvas.prototype.removeObserver = function (ctEvent, obj) {
        var index = this[ctEvent + 'Observers'].indexOf(obj);
        if (index >= 0) {
            this[ctEvent + 'Observers'].splice(index, 1);
            this[ctEvent + 'Functions'].splice(index, 1);
        }
    };
    return ctCanvas;
})();
var ctObj = (function () {
    function ctObj(x, y, w, h, alpha) {
        this.x = x || 0;
        this.y = y || 0;
        this.w = w || 100;
        this.h = h || 100;
        this.alpha = alpha || 1;
    }
    ctObj.prototype.superdraw = function () {
        this.context.globalAlpha = this.alpha;
    };
    ctObj.prototype.on = function (ctevent, func) {
        this.ctcanvas.registerObserver(ctevent, func, this);
    };
    ctObj.prototype.off = function (ctevent) {
        this.ctcanvas.removeObserver(ctevent, this);
    };
    //linear tween
    ctObj.prototype.to = function (args, time, callback) {
        var dt = 20;
        var step = time / dt;
        var vx = args.x ? (args.x - this.x) / time * dt : 0;
        var vy = args.y ? (args.y - this.y) / time * dt : 0;
        var vw = args.w ? (args.w - this.w) / time * dt : 0;
        var vh = args.h ? (args.h - this.h) / time * dt : 0;
        var valpha = args.alpha ? (args.alpha - this.alpha) / time * dt : 0;
        var that = this;
        var animate = animation(function () {
            that.x += vx;
            that.y += vy;
            that.w += vw;
            that.h += vh;
            that.alpha += valpha;
            step--;
            if (step <= 0) {
                clearInterval(animate);
                callback();
            }
        }, this.ctcanvas, dt);
    };
    return ctObj;
})();
//==========animation=============
//time base animation
function animation(update, context, dt, fps) {
    var current = new Date().getTime();
    var acc = 0;
    var dt = dt || 20;
    var fps = fps || 50;
    var time = Math.ceil(1000 / this.fps);
    function loop() {
        var now = new Date().getTime();
        var passed = now - current;
        current = now;
        acc += passed;
        while (acc >= dt) {
            update();
            acc -= dt;
        }
        context.drawCanvas();
    }
    return setInterval(loop, time);
}
//===========obj=================
var ctFillRect = (function (_super) {
    __extends(ctFillRect, _super);
    function ctFillRect(fillStyle, x, y, w, h, alpha) {
        _super.call(this, x, y, w, h, alpha);
        this.fillStyle = fillStyle || '#000';
    }
    ctFillRect.prototype.draw = function () {
        this.superdraw();
        this.context.fillStyle = this.fillStyle;
        this.context.fillRect(this.x, this.y, this.w, this.h);
    };
    return ctFillRect;
})(ctObj);
var ctFillText = (function (_super) {
    __extends(ctFillText, _super);
    function ctFillText(text, font, fillStyle, x, y, w, h, alpha) {
        _super.call(this, x, y, w, h, alpha);
        this.text = text || '';
        this.font = font || '50px helvetica';
        this.fillStyle = fillStyle || '#000';
    }
    ctFillText.prototype.draw = function () {
        this.superdraw();
        this.context.font = this.font;
        this.context.fillStyle = this.fillStyle;
        this.context.fillText(this.text, this.x, this.y, this.w);
    };
    return ctFillText;
})(ctObj);
