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
    //linear tween animation
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
//============debug==============
function showPosition(target, ctcanvas) {
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
function showPositions(targetarr, ctcanvas) {
    for (var i = 0; i < targetarr.length; i++) {
        showPosition(targetarr[i], ctcanvas);
    }
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
var ctStrokeRect = (function (_super) {
    __extends(ctStrokeRect, _super);
    function ctStrokeRect(strokeStyle, lineWidth, x, y, w, h, alpha) {
        _super.call(this, x, y, w, h, alpha);
        this.strokeStyle = strokeStyle || '#f00';
        this.lineWidth = lineWidth || 1;
    }
    ctStrokeRect.prototype.draw = function () {
        this.superdraw();
        this.context.strokeStyle = this.strokeStyle;
        this.context.lineWidth = this.lineWidth;
        this.context.strokeRect(this.x, this.y, this.w, this.h);
    };
    return ctStrokeRect;
})(ctObj);
var ctFillText = (function (_super) {
    __extends(ctFillText, _super);
    function ctFillText(text, font, fillStyle, x, y, w, h, alpha) {
        _super.call(this, x, y, w, h, alpha);
        this.text = text || '';
        this.font = font || '40px Arial';
        this.fillStyle = fillStyle || '#000';
    }
    ctFillText.prototype.draw = function () {
        this.superdraw();
        this.context.fillStyle = this.fillStyle;
        this.context.font = this.font;
        this.context.fillText(this.text, this.x, this.y);
    };
    return ctFillText;
})(ctObj);
var ctFillCircle = (function (_super) {
    __extends(ctFillCircle, _super);
    function ctFillCircle(fillStyle, ox, oy, r, alpha) {
        _super.call(this, ox - r, oy - r, 2 * r, 2 * r, alpha);
        this.fillStyle = fillStyle || '#000';
        this.ox = ox || 50;
        this.oy = oy || 50;
        this.r = r || 50;
        this.sangle = 0;
        this.eangle = Math.PI * 2;
        this.alpha = alpha || 1;
        this.clockwise = true;
    }
    ctFillCircle.prototype.draw = function () {
        this.superdraw();
        this.context.beginPath();
        this.context.fillStyle = this.fillStyle;
        this.context.arc(this.x + this.r, this.y + this.r, this.r, this.sangle, this.eangle, this.clockwise);
        this.context.closePath();
        this.context.fill();
    };
    return ctFillCircle;
})(ctObj);
var ctFillArc = (function (_super) {
    __extends(ctFillArc, _super);
    function ctFillArc(fillStyle, ox, oy, r, sangle, eangle, alpha, clockwise) {
        _super.call(this, ox - r, oy - r, 2 * r, 2 * r, alpha);
        this.fillStyle = fillStyle || '#000';
        this.ox = ox || 50;
        this.oy = oy || 50;
        this.r = r || 50;
        this.sangle = sangle / 180 * Math.PI || 0;
        this.eangle = eangle / 180 * Math.PI || Math.PI * 2;
        this.alpha = alpha || 1;
        this.clockwise = clockwise || true;
    }
    ctFillArc.prototype.draw = function () {
        this.superdraw();
        this.context.beginPath();
        this.context.fillStyle = this.fillStyle;
        this.context.arc(this.x + this.r, this.y + this.r, this.r, this.sangle, this.eangle, this.clockwise);
        this.context.lineTo(this.x + this.r, this.y + this.r);
        this.context.closePath();
        this.context.fill();
    };
    return ctFillArc;
})(ctObj);
var skillArc = (function (_super) {
    __extends(skillArc, _super);
    function skillArc(fillStyle, sangle, eangle, r, clockwise) {
        _super.call(this, 200, 200, 200, 200, 1);
        this.fillStyle = fillStyle;
        this.ox = 300;
        this.oy = 300;
        this.r = r;
        this.sangle = sangle * Math.PI / 180 || 0;
        this.eangle = eangle * Math.PI / 180 || Math.PI * 2;
        this.clockwise = clockwise || false;
    }
    skillArc.prototype.draw = function () {
        this.superdraw();
        this.context.beginPath();
        this.context.fillStyle = this.fillStyle;
        this.context.arc(this.ox, this.oy, this.r, this.sangle, this.eangle, this.clockwise);
        this.context.lineTo(this.ox, this.oy);
        this.context.closePath();
        this.context.fill();
    };
    return skillArc;
})(ctObj);
var skillNode = (function (_super) {
    __extends(skillNode, _super);
    function skillNode(nodetext, fillStyle, x, y) {
        _super.call(this, x || 270, y || 270, 60, 60, 1);
        this.fillStyle = fillStyle || '#555';
        this.nodetext = nodetext;
        this.r = 25;
    }
    skillNode.prototype.draw = function () {
        this.superdraw();
        this.context.beginPath();
        this.context.fillStyle = this.fillStyle;
        this.context.arc(this.x + 30, this.y + 30, this.r, 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.fill();
        this.context.fillStyle = '#fff';
        var xplus = 0;
        if (this.nodetext.length > 6) {
            this.context.font = '7px Arial';
            xplus = 4;
        }
        else {
            this.context.font = '15px Arial';
        }
        this.context.fillText(this.nodetext, this.x + xplus + 30 - this.context.measureText(this.nodetext).width / 2, this.y + 35, 50);
    };
    return skillNode;
})(ctObj);
