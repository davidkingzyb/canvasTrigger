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