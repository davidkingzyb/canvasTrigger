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
//  api: https://github.com/davidkingzyb/canvasTrigger/blob/master/api.md
//  define objects in canvas and dispatch canvas event to those objects.
//  base on observe pattern 
//  debug and simple animation
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// quick example
// var ctcanvas=new ctCanvas('canvas');
// ctcanvas.addTrigger('click');
// var a=new ctFillRect(100,100,200,200,'#f00');
// ctcanvas.addObj(a);
// a.on('click',function(){
// 	console.log('a click');
// });
//=============core=================
var ctCanvas = /** @class */ (function () {
    function ctCanvas(id) {
        this.objs = [];
        this.triggers = [];
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext('2d');
    }
    ctCanvas.prototype.reset = function () {
        this.objs = [];
        for (var i = 0; i < this.triggers.length; i++) {
            this.resetTrigger(this.triggers[i]);
        }
        this.triggers = [];
        this.drawCanvas();
    };
    ctCanvas.prototype.addObj = function (obj) {
        this.objs.push(obj);
        obj.ctcanvas = this;
        obj.context = this.context;
        obj.draw();
    };
    ctCanvas.prototype.addObjs = function (objarr) {
        for (var i = 0; i < objarr.length; i++) {
            this.addObj(objarr[i]);
        }
    };
    ctCanvas.prototype.removeObj = function (obj) {
        var index = this.objs.indexOf(obj);
        if (index >= 0) {
            this.objs.splice(index, 1);
        }
        this.offObj(obj);
        this.drawCanvas();
    };
    ctCanvas.prototype.removeObjs = function (objarr) {
        for (var i = 0; i < objarr.length; i++) {
            this.removeObj(objarr[i]);
        }
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
        if (this.triggers.indexOf(ctEvent) === -1) {
            this.triggers.push(ctEvent);
            this[ctEvent + 'Observers'] = [];
            this[ctEvent + 'Functions'] = [];
            var that = this;
            this.canvas['on' + ctEvent] = function (e) {
                that.Notify(e, ctEvent);
            };
        }
    };
    ctCanvas.prototype.resetTrigger = function (ctEvent) {
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
}());
var ctObj = /** @class */ (function () {
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
    return ctObj;
}());
//============debug==============
function cT_showPosition(target, ctcanvas) {
    ctcanvas.addTrigger('mousemove');
    ctcanvas.addTrigger('mousedown');
    ctcanvas.addTrigger('mouseup');
    var coordinate = new ctFillText('[' + target.x + ',' + target.y + ']', '3px Arial', '#f00', target.x, target.y);
    ctcanvas.addObj(coordinate);
    var border = new ctStrokeRect('#f00', 1, target.x, target.y, target.w, target.h);
    ctcanvas.addObj(border);
    var startX;
    var startY;
    var targetStartX;
    var targetStartY;
    var ismove = false;
    target.on('mousedown', function (e) {
        targetStartX = target.x;
        targetStartY = target.y;
        startX = e.layerX;
        startY = e.layerY;
        ismove = true;
        console.log('x', 'y', 'width', 'height');
    });
    target.on('mousemove', function (e) {
        if (ismove) {
            target.x = Math.ceil(targetStartX + (e.layerX - startX));
            target.y = Math.ceil(targetStartY + (e.layerY - startY));
            coordinate.text = '[' + parseInt(target.x) + ',' + parseInt(target.y) + ']';
            coordinate.x = target.x;
            coordinate.y = target.y;
            border.x = target.x;
            border.y = target.y;
            ctcanvas.drawCanvas();
        }
    });
    target.on('mouseup', function (e) {
        ismove = false;
        console.log(target.x, target.y, target.w, target.h);
    });
}
function cT_showPositions(targetarr, ctcanvas) {
    for (var i = 0; i < targetarr.length; i++) {
        cT_showPosition(targetarr[i], ctcanvas);
    }
}
//===========obj=================
var ctFillRect = /** @class */ (function (_super) {
    __extends(ctFillRect, _super);
    function ctFillRect(fillStyle, x, y, w, h, alpha) {
        var _this = _super.call(this, x, y, w, h, alpha) || this;
        _this.fillStyle = fillStyle || '#000';
        return _this;
    }
    ctFillRect.prototype.draw = function () {
        this.superdraw();
        this.context.fillStyle = this.fillStyle;
        this.context.fillRect(this.x, this.y, this.w, this.h);
    };
    return ctFillRect;
}(ctObj));
var ctStrokeRect = /** @class */ (function (_super) {
    __extends(ctStrokeRect, _super);
    function ctStrokeRect(strokeStyle, lineWidth, x, y, w, h, alpha) {
        var _this = _super.call(this, x, y, w, h, alpha) || this;
        _this.strokeStyle = strokeStyle || '#f00';
        _this.lineWidth = lineWidth || 1;
        return _this;
    }
    ctStrokeRect.prototype.draw = function () {
        this.superdraw();
        this.context.strokeStyle = this.strokeStyle;
        this.context.lineWidth = this.lineWidth;
        this.context.strokeRect(this.x, this.y, this.w, this.h);
    };
    return ctStrokeRect;
}(ctObj));
var ctFillText = /** @class */ (function (_super) {
    __extends(ctFillText, _super);
    function ctFillText(text, font, fillStyle, x, y, w, h, alpha, rotation) {
        var _this = _super.call(this, x, y, w, h, alpha) || this;
        _this.text = text || '';
        _this.font = font || '40px Arial';
        _this.fillStyle = fillStyle || '#000';
        return _this;
    }
    ctFillText.prototype.draw = function () {
        this.superdraw();
        this.context.fillStyle = this.fillStyle;
        this.context.font = this.font;
        this.context.fillText(this.text, this.x, this.y);
    };
    return ctFillText;
}(ctObj));
var ctDrawImg = /** @class */ (function (_super) {
    __extends(ctDrawImg, _super);
    function ctDrawImg(img, x, y, w, h, alpha, sx, sy, sw, sh) {
        var _this = _super.call(this, x, y, img.width, img.height, alpha) || this;
        _this.img = img;
        _this.sx = sx || 0;
        _this.sy = sy || 0;
        _this.sw = sw || img.width;
        _this.sh = sh || img.height;
        return _this;
    }
    ctDrawImg.prototype.draw = function () {
        this.superdraw();
        this.context.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.w, this.h);
    };
    return ctDrawImg;
}(ctObj));
var ctLine = /** @class */ (function (_super) {
    __extends(ctLine, _super);
    function ctLine(strokeStyle, sx, sy, ex, ey, lineWidth, alpha) {
        var _this = _super.call(this, 1, 1, 1, 1, alpha) || this;
        _this.strokeStyle = strokeStyle;
        _this.sx = sx;
        _this.sy = sy;
        _this.ex = ex;
        _this.ey = ey;
        _this.lineWidth = lineWidth || 2;
        return _this;
    }
    ctLine.prototype.draw = function () {
        this.superdraw();
        this.context.beginPath();
        this.context.strokeStyle = this.strokeStyle;
        this.context.lineWidth = this.lineWidth;
        this.context.moveTo(this.sx, this.sy);
        this.context.lineTo(this.ex, this.ey);
        this.context.stroke();
        this.context.closePath();
    };
    return ctLine;
}(ctObj));
