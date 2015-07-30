var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ctCanvas = (function () {
    function ctCanvas(id) {
        this.objs = [];
        this.clickObservers = [];
        this.clickFunctions = [];
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext('2d');
        this.ct_onclick();
    }
    ctCanvas.prototype.addObj = function (obj) {
        this.objs.push(obj);
        obj.ctcanvas = this;
        obj.context = this.context;
        obj.draw();
    };
    ctCanvas.prototype.ct_onclick = function () {
        var that = this;
        this.canvas.onclick = function (e) {
            that.clickNotify(e);
        };
    };
    ctCanvas.prototype.clickNotify = function (e) {
        var layerX = e.layerX;
        var layerY = e.layerY;
        for (var i = 0; i < this.clickObservers.length; i++) {
            var obj = this.clickObservers[i];
            if (layerX > obj.x && layerX < (obj.x + obj.w) && layerY > obj.y && layerY < (obj.y + obj.h)) {
                this.clickFunctions[i].call(obj);
            }
        }
    };
    ctCanvas.prototype.registerObserver = function (event, func, obj) {
        if (event === 'click') {
            this.clickObservers.push(obj);
            this.clickFunctions.push(func);
        }
    };
    ctCanvas.prototype.removeObserver = function (event, func, obj) {
        if (event === 'click') {
            var index = this.clickObservers.indexOf(obj);
            if (index >= 0) {
                this.clickObservers.splice(index, 1);
                this.clickFunctions.splice(index, 1);
            }
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
    ctObj.prototype.clear = function () {
    };
    ctObj.prototype.on = function (event, func) {
        this.ctcanvas.registerObserver(event, func, this);
    };
    ctObj.prototype.off = function (event, func) {
        this.ctcanvas.removeObserver(event, func, this);
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
