///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                      ________                                             //  
//                                                     |__    __|        __                                  //  
//   ______    ____    ______   __  __   ____    ______   |  |    __  __|__|  _____   _____   _____  __  __  //  
//  |   ___|  /    \  |      \ |  | | | /    \  /  ___/   |  |   |  |/_/|  | / _   | / _   | /  _  \|  |/_/  //  
//  |  |____ /  /   \_|   _   |\   \/ //  /   \_\___  \   |  |   |   |  |  |_\___  |_\___  |/  ____/|   |    //  
//  |_______|\_______/|__| |__| \____/ \_______/\_____/   |__|   |___|  |__|\______|\______|\______/|___|    //  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  2018/3/10 by DKZ https://davidkingzyb.github.io
//  github: https://github.com/davidkingzyb/canvasTrigger
//  guide: http://davidkingzyb.github.io/blogmd/6.html
//  api: https://github.com/davidkingzyb/canvasTrigger/blob/master/api.md

// class BarChart{
//     canvas;
//     line;
//     raw_title;
//     title;
//     CHART_HEIGHT=500;

//     constructor(id,title=''){
//         this.canvas=new ctCanvas(id);
//         this.raw_title=title;
//     }

//     far=0;
//     speed=0;
//     absspeed=0;
//     anmtctrl;

//     initAnimate(offset){
//         console.log(offset);
//         this.start_x+=offset;
//         this.far=Math.abs(offset);
//         this.speed=parseInt(offset/100);
//         this.absspeed=Math.abs(this.speed);
//         if(!this.anmtctrl){
//             this.anmtctrl=new animationCtrl();
//             this.anmtctrl.start()
//             this.anmtctrl.on(function(){
//                 this.far-=this.absspeed;
//                 for(var i=0;i<this.bar_list.length;i++){
//                     this.bar_list[i].x+=this.speed;
//                 }
//                 for(var j=0;j<this.name_list.length;j++){
//                     this.name_list[j].x+=this.speed;
//                 }
//                 this.canvas.drawCanvas();
//                 if(this.far<0){
//                     this.anmtctrl.stop();
//                     this.anmtctrl=null
//                     console.log('stop')
//                 }
//             },this)
//         }else{
//             console.warn('is runing');
//         }
//     }

//     drawBase(){
//         this.title=new ctFillText(this.raw_title,'20px SimHei','#000',50,50);
//         this.canvas.addObj(this.title);
//         this.line=new ctLine('#000',20,500,1000,this.CHART_HEIGHT,1);
//         this.canvas.addObj(this.line);
//     }

//     start_x=50;
//     bar_list=[];
//     name_list=[];

//     addBar(name,height){
//         var bar=new ctFillRect('#999',this.start_x,this.CHART_HEIGHT+1-height,50,height);
//         var name=new ctFillText(name,'15px SimHei','#000',this.start_x,this.CHART_HEIGHT+15);
//         this.bar_list.push(bar);
//         this.name_list.push(name);
//         this.start_x+=100;
//         this.canvas.addObj(bar);
//         this.canvas.addObj(name);
//     }

//     raw_data_list=[]
//     max_num=1;

//     //datalist [{'name':<string>,'num':<int>},]
//     public concatData(datalist){
//         for(var i=0;i<datalist.length;i++){
//             if(datalist[i].num>this.max_num){
//                 this.max_num=datalist[i].num;
//             }
//         }
//         this.raw_data_list=this.raw_data_list.concat(datalist);
//         this.calcData();
//         this.renderData();
//     }

//     calcData(){
//         for(var i=0;i<this.raw_data_list.length;i++){
//             this.raw_data_list[i].height=(this.CHART_HEIGHT-20)*(this.raw_data_list[i].num/this.max_num);
//         }
//     }

//     renderData(){
//         if(this.bar_list[0]){
//             this.start_x=this.bar_list[0].x;
//         }
//         this.canvas.reset()
//         this.bar_list=[];
//         this.name_list=[];
//         this.drawBase();
//         for(var i=0;i<this.raw_data_list.length;i++){
//             this.addBar(this.raw_data_list[i].name,this.raw_data_list[i].height);
//         }
//     }

// }


// class ctFillCircle extends ctObj{
//     fillStyle;
//     ox;
//     oy;
//     r;
//     sangle;
//     eangle;
//     clockwise;
//     constructor(fillStyle?,ox?,oy?,r?,alpha?){
//         super(ox-r,oy-r,2*r,2*r,alpha);
//         this.fillStyle=fillStyle||'#000';
//         this.ox=ox||50;
//         this.oy=oy||50;
//         this.r=r||50;
//         this.sangle=0;
//         this.eangle=Math.PI*2;
//         this.alpha=alpha||1;
//         this.clockwise=true;
//     }
//     draw(){
//         this.superdraw();
//         this.context.beginPath();
//         this.context.fillStyle=this.fillStyle;
//         this.context.arc(this.x+this.r,this.y+this.r,this.r,this.sangle,this.eangle,this.clockwise);
//         this.context.closePath();
//         this.context.fill();
//     }
// }

// class ctStrokeArc extends ctObj{
//     strokeStyle;
//     lineWidth;
//     ox;
//     oy;
//     r;
//     sangle;
//     eangle;
//     clockwise;
//     constructor(strokeStyle,lineWidth?,ox?,oy?,r?,sangle?,eangle?,alpha?,clockwise?){
//         super(ox-r,oy-r,2*r,2*r,alpha);
//         this.strokeStyle=strokeStyle;
//         this.lineWidth=lineWidth||2;
//         this.ox=ox||50;
//         this.oy=oy||50;
//         this.r=r||50;
//         this.sangle=sangle/180*Math.PI||0;
//         this.eangle=eangle/180*Math.PI||Math.PI*2;
//         this.alpha=alpha||1;
//         this.clockwise=clockwise||false;
//     }
//     draw(){
//         this.superdraw();
//         this.context.beginPath();
//         this.context.strokeStyle=this.strokeStyle;
//         this.context.lineWidth=this.lineWidth;
//         this.context.arc(this.x+this.r,this.y+this.r,this.r,this.sangle,this.eangle,this.clockwise);
//         this.context.stroke();
//         this.context.closePath();
//     }
// }

// class ctFillArc extends ctObj{
//     fillStyle;
//     ox;
//     oy;
//     r;
//     sangle;
//     eangle;
//     clockwise;
//     constructor(fillStyle?,ox?,oy?,r?,sangle?,eangle?,alpha?,clockwise?){
//         super(ox-r,oy-r,2*r,2*r,alpha);
//         this.fillStyle=fillStyle||'#000';
//         this.ox=ox||50;
//         this.oy=oy||50;
//         this.r=r||50;
//         this.sangle=sangle/180*Math.PI||0;
//         this.eangle=eangle/180*Math.PI||Math.PI*2;
//         this.alpha=alpha||1;
//         this.clockwise=clockwise||true;
//     }
    
//     draw(){
//         this.superdraw();
//         this.context.beginPath();
//         this.context.fillStyle=this.fillStyle;
//         this.context.arc(this.x+this.r,this.y+this.r,this.r,this.sangle,this.eangle,this.clockwise);
//         this.context.lineTo(this.x+this.r,this.y+this.r);
//         this.context.closePath();
//         this.context.fill();
//     }
// }
