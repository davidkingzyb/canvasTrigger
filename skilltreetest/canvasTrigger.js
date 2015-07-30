var ctCanvas = (function () {
    function ctCanvas(id) {
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext('2d');
        this.onclick();
    }
    ctCanvas.prototype.onclick = function () {
        this.canvas.onclick = function (e) {
            console.log(e.layerX, e.layerY);
        };
    };
    return ctCanvas;
})();
