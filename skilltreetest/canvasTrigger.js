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
                this[ctEvent + 'Functions'][i].call(obj);
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
    function ctObj(x, y, w, h) {
        this.x = x || 0;
        this.y = y || 0;
        this.w = w || 0;
        this.h = h || 0;
    }
    ctObj.prototype.on = function (ctevent, func) {
        this.ctcanvas.registerObserver(ctevent, func, this);
    };
    ctObj.prototype.off = function (ctevent) {
        this.ctcanvas.removeObserver(ctevent, this);
    };
    return ctObj;
})();
var ctFillRect = (function (_super) {
    __extends(ctFillRect, _super);
    function ctFillRect(x, y, w, h, fillStyle) {
        _super.call(this, x, y, w, h);
        this.fillStyle = fillStyle;
    }
    ctFillRect.prototype.draw = function () {
        this.context.fillStyle = this.fillStyle;
        this.context.fillRect(this.x, this.y, this.w, this.h);
    };
    return ctFillRect;
})(ctObj);
