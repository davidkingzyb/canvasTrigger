var Gobang=(function(){
    function Gobang(){
        this._iswhite=true;//当前落子颜色
        this._board=[];//二维数组棋盘，-1：空白，0:白子，1:黑子
        this._steps=[];//储存上一步的信息
        this._regret_step=[];//储存悔棋的信息
        this.isai_white;//AI执子颜色
        this.initBoard();
        this.initCanvas('gobang')
    }
    Gobang.SIZE=10;//棋盘大小
    Gobang.ISAI=false;//AI模式开关
    //落子
    Gobang.prototype.move=function(x,y){
        console.log('move',x,y)
        if(this._board[x][y]===-1){
            this._board[x][y]=this._iswhite?0:1;
            var piece=this.drawPiece(this._iswhite,x,y);
            this._steps.push({
                'x':x,
                'y':y,
                '_iswhite':this._iswhite,
                'piece':piece
            })
            var checknum=this._iswhite?0:1;
            if(this.check(checknum,x,y)){
                this.showResult(checknum);
            }else if(this._steps.length>=Gobang.SIZE*Gobang.SIZE){
                this.showResult(-1);
            }else if(Gobang.ISAI&&this.isai_white==this._iswhite){
                var xy=this.aiMove(checknum,x,y);
                this._iswhite=!this._iswhite;
                this.move(xy.x,xy.y);
            }else{
                this._iswhite=!this._iswhite;
            } 
        }
    }
    //检查输赢
    Gobang.prototype.check=function(checknum,x,y){
        var row_count=0;
        var col_count=0;
        for(var i=0;i<Gobang.SIZE;i++){
            if(this._board[x][i]===checknum){
                col_count++;
                if(col_count===5)return true;
            }else{
                col_count=0;
            }
            if(this._board[i][y]===checknum){
                row_count++;
                if(row_count===5)return true;
            }else{
                row_count=0;
            }
        }
        var slash_count=1;
        for(var j=1;j<5;j++){
            if(x+j<Gobang.SIZE&&y+j<Gobang.SIZE&&this._board[x+j][y+j]===checknum){
                slash_count++;
            }else{
                break;
            }
        }
        for(var jj=1;jj<5;jj++){
            if(x-jj>=0&&y-jj>=0&&this._board[x-jj][y-jj]===checknum){
                slash_count++;
            }else{
                break;
            }
        }
        if(slash_count>=5)return true;
        var backslash_count=1;
        for(var k=1;k<5;k++){
            if(x+k<Gobang.SIZE&&y-k>=0&&this._board[x+k][y-k]===checknum){
                backslash_count++;
            }else{
                break;
            }
        }
        for(var kk=1;kk<5;kk++){
            if(x-kk>=0&&y+kk<Gobang.SIZE&&this._board[x-kk][y+kk]===checknum){
                backslash_count++;
            }else{
                break;
            }
        }
        if(backslash_count>=5)return true;
    }
    //悔棋
    Gobang.prototype.regret=function(){
        if(this._steps){
            var step=this._steps.pop()
            this._board[step.x][step.y]=-1;
            this._iswhite=!this._iswhite;
            this.removePiece(step.piece);
            this._regret_step.push(step);
        }    
    }
    //撤销悔棋
    Gobang.prototype.redo=function(){
        if(this._regret_step){
            var step=this._regret_step.pop();
            this.move(step.x,step.y);
        }
    }
    Gobang.prototype.clearRegetSteps=function(){
        this._regret_step=[];
    }
    //defalut -1 white 0 black 1
    Gobang.prototype.initBoard=function(){
        this._board=[];
        this._steps=[];
        for(var i=0;i<Gobang.SIZE;i++){
            var row=[];
            for(var j=0;j<Gobang.SIZE;j++){
                row.push(-1);
            }
            this._board.push(row);
        }
        console.log('initBoard',this._board);
    }

    return Gobang;
}())

//Canvas渲染，基于canvasTrigger https://github.com/davidkingzyb/canvasTrigger
var CTRender=(function(){
    function CTRender(){
    }
    CTRender.prototype.initCanvas=function(id){
        this.ctcanvas=new ctCanvas(id);
        this.ctcanvas.canvas.width=Gobang.SIZE*50+50;
        this.ctcanvas.canvas.height=Gobang.SIZE*50+50;
        this.drawBoard()
        this.ctcanvas.addTrigger('click');
        this.boardbackground.on('click',(e)=>{
            var x=Math.floor((e.layerX-20)/50)
            var y=Math.floor((e.layerY-20)/50)
            if(x>=0&&x<Gobang.SIZE&&y>=0&&y<Gobang.SIZE){
                this.move(x,y);
                this.clearRegetSteps();
            }
        })
    }
    //绘制棋盘
    CTRender.prototype.drawBoard=function(){
        for(var i=0;i<Gobang.SIZE;i++){
            var row=new ctLine('#222',0,50+50*i,50+Gobang.SIZE*50,50+50*i,1);
            var col=new ctLine('#222',50+50*i,0,50+50*i,50+Gobang.SIZE*50,1);
            this.ctcanvas.addObj(row);
            this.ctcanvas.addObj(col);
        }
        this.boardbackground=new ctFillRect('#eeb',0,0,50+Gobang.SIZE*50,50+Gobang.SIZE*50,0.7);
        this.ctcanvas.addObj(this.boardbackground);
    }
    //落子
    CTRender.prototype.drawPiece=function(iswhite,x,y){
        var piece
        if(iswhite){
            piece=new ctFillCircle('#fff',50+50*x,50+50*y,15);
        }else{
            piece=new ctFillCircle('#000',50+50*x,50+50*y,15);
        }
        this.ctcanvas.addObj(piece);
        return piece;
    }
    //移除棋子
    CTRender.prototype.removePiece=function(piece){
        this.ctcanvas.removeObj(piece);
    }
    //结束信息
    CTRender.prototype.showResult=function(checknum){
        this.boardbackground.off('click');
        var result;
        if(checknum===0){
            result=new ctFillText('White Win','100px Arial','#fff',50,200);
            this.ctcanvas.addObj(result)
        }else if(checknum===1){
            result=new ctFillText('Black Win','100px Arial','#000',50,200);
            this.ctcanvas.addObj(result)
        }else{
            result=new ctFillText('We Draw','100px Arial','#000',50,200);
            this.ctcanvas.addObj(result)
        }
    }

    return CTRender;
}())
mixinClass(CTRender,Gobang);//更改渲染方式只需实现新的CTRender，在这里掺入

//一个比较蠢的AI，只会堵
var AI=(function(){
    function AI(){}

    //return {x:y} AI选择的落子地点
    AI.prototype.aiMove=function(prev_checknum,prev_x,prev_y){
        var count_obj=this._countAround(prev_checknum,prev_x,prev_y);
        var max_key;
        var max=0;
        for(var k in count_obj){
            if(max<count_obj[k]){
                max=count_obj[k];
                max_key=k.replace('_count','');
            }
        }
        console.log('max',max_key,max);
        return this['_'+max_key+'Block'](prev_x,prev_y);
    }

    AI.prototype._rowBlock=function(x,y){
        for(var i=1;i<5;i++){
            if(x+i<Gobang.SIZE&&this._board[x+i][y]===-1){
                return {x:x+i,y:y};
            }
            if(x-i>=0&&this._board[x-i][y]===-1){
                return {x:x-i,y:y};
            }
        }
        return this.randomXY();
    }

    AI.prototype._colBlock=function(x,y){
        for(var i=1;i<5;i++){
            if(y+i<Gobang.SIZE&&this._board[x][y+i]===-1){
                return {x:x,y:y+i};
            }
            if(y-i>=0&&this._board[x][y-i]===-1){
                return {x:x,y:y-i};
            }
        }
        return this.randomXY();
    }

    AI.prototype._slashBlock=function(x,y){
        for(var j=1;j<5;j++){
            if(x+j<Gobang.SIZE&&y+j<Gobang.SIZE&&this._board[x+j][y+j]===-1){
                return {x:x+j,y:y+j};
            }
            if(x-j>=0&&y-j>=0&&this._board[x-j][y-j]===-1){
                return {x:x-j,y:y-j};
            }
        }
        return this.randomXY();
    }

    AI.prototype._backslashBlock=function(x,y){
        for(var k=1;k<5;k++){
            if(x+k<Gobang.SIZE&&y-k>=0&&this._board[x+k][y-k]===-1){
                return {x:x+k,y:y-k};
            }
            if(x-k>=0&&y+k<Gobang.SIZE&&this._board[x-k][y+k]===-1){
                return {x:x-k,y:y+k};
            }
        }
        return this.randomXY();
    }

    AI.prototype.randomXY=function(){
        var randomlist=[]
        for(var i=0;i<Gobang.SIZE;i++){
            for(var j=0;j<Gobang.SIZE;j++){
                if(this._board[i][j]===-1){
                    randomlist.push({x:i,y:j});
                }
            }
        }
        return randomlist[Math.floor(Math.random()*randomlist.length)];
    }

    AI.prototype._countAround=function(checknum,x,y){
        var row_count=0;
        for(var h=1;h<5;h++){
            if(x+h<Gobang.SIZE&&this._board[x+h][y]===checknum){
                row_count++
            }else{
                break;
            }
        }
        for(var hh=1;hh<5;hh++){
            if(x-hh>=0&&this._board[x-hh][y]===checknum){
                row_count++
            }else{
                break;
            }
        }
        var col_count=0;
        for(var i=1;i<5;i++){
            if(y+i<Gobang.SIZE&&this._board[x][y+i]===checknum){
                col_count++
            }else{
                break;
            }
        }
        for(var ii=1;ii<5;ii++){
            if(y-ii>=0&&this._board[x][y-ii]===checknum){
                col_count++
            }else{
                break;
            }
        }

        var slash_count=1;
        for(var j=1;j<5;j++){
            if(x+j<Gobang.SIZE&&y+j<Gobang.SIZE&&this._board[x+j][y+j]===checknum){
                slash_count++;
            }else{
                break;
            }
        }
        for(var jj=1;jj<5;jj++){
            if(x-jj>=0&&y-jj>=0&&this._board[x-jj][y-jj]===checknum){
                slash_count++;
            }else{
                break;
            }
        }
        var backslash_count=1;
        for(var k=1;k<5;k++){
            if(x+k<Gobang.SIZE&&y-k>=0&&this._board[x+k][y-k]===checknum){
                backslash_count++;
            }else{
                break;
            }
        }
        for(var kk=1;kk<5;kk++){
            if(x-kk>=0&&y+kk<Gobang.SIZE&&this._board[x-kk][y+kk]===checknum){
                backslash_count++;
            }else{
                break;
            }
        }
        return {
            'row_count':row_count,
            'col_count':col_count,
            'slash_count':slash_count,
            'backslash_count':backslash_count
        }
    }

    return AI;
}())
mixinClass(AI,Gobang);

//main
var gobang=new Gobang();
function restart(){
    gobang=new Gobang();
    Gobang.ISAI=false;
}
function regret(){
    if(Gobang.ISAI){
        gobang.regret();
        gobang.regret();
    }else{
        gobang.regret();
    }
}
function redo(){
    if(Gobang.ISAI){
        gobang.redo();
        gobang.redo();
    }else{
        gobang.redo();
    }
}
function ai(){
    Gobang.ISAI=true;        
    var last_step=gobang._steps.pop();
    if(last_step){
        gobang.isai_white=last_step._iswhite;
        var checknum=last_step._iswhite?0:1;
        var xy=gobang.aiMove(checknum,last_step.x,last_step.y);
        gobang.move(xy.x,xy.y);
    }else{
        gobang.isai_white=!true;
        var xy=gobang.randomXY()
        gobang.move(xy.x,xy.y);
    }    
}

function mixinClass(source,target){    
        //public and private function   
        Object.getOwnPropertyNames(source.prototype).forEach(name => {
            if (name !== "constructor" && name.indexOf('__')<0) {
                if(target.prototype[name]){
                    tool.warn('*** target already have',name);
                }else{
                    target.prototype[name] = source.prototype[name];
                } 
            }
        });
        //static function
        Object.getOwnPropertyNames(source).forEach(name => {
            if('length,name,prototype,arguments,caller'.indexOf(name)<0){
                if(target[name]){
                    tool.warn('*** target already have ',name);
                }else{
                    target[name] = source[name];
                } 
            }
        });
    }