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

import {ctCanvas,ctObj,cT_showPosition,cT_showPositions,ctFillRect,ctStrokeRect,ctFillText,ctDrawImg,ctLine,ctFillCircle} from './canvastrigger'

class ctBarChart{
    canvas;
    line;
    raw_title;
    title;
    CHART_HEIGHT=500;

    constructor(id,title=''){
        this.canvas=new ctCanvas(id);
        this.raw_title=title;
    }

    drawBase(){
        this.title=new ctFillText(this.raw_title,'20px SimHei','#000',50,50);
        this.canvas.addObj(this.title);
        this.line=new ctLine('#000',20,500,1000,this.CHART_HEIGHT,1);
        this.canvas.addObj(this.line);
    }

    start_x=50;
    bar_list=[];
    name_list=[];

    addBar(name,height){
        var bar=new ctFillRect('#999',this.start_x,this.CHART_HEIGHT+1-height,50,height);
        var nametf=new ctFillText(name,'15px SimHei','#000',this.start_x,this.CHART_HEIGHT+15);
        this.bar_list.push(bar);
        this.name_list.push(nametf);
        this.start_x+=100;
        this.canvas.addObj(bar);
        this.canvas.addObj(nametf);
    }

    raw_data_list=[]
    max_num=1;

    //datalist [{'name':<string>,'num':<int>},]
    concatData(datalist){
        for(var i=0;i<datalist.length;i++){
            if(datalist[i].num>this.max_num){
                this.max_num=datalist[i].num;
            }
        }
        this.raw_data_list=this.raw_data_list.concat(datalist);
        this.calcData();
        this.renderData();
    }

    calcData(){
        for(var i=0;i<this.raw_data_list.length;i++){
            this.raw_data_list[i].height=(this.CHART_HEIGHT-20)*(this.raw_data_list[i].num/this.max_num);
        }
    }

    renderData(){
        if(this.bar_list[0]){
            this.start_x=this.bar_list[0].x;
        }
        this.canvas.reset()
        this.bar_list=[];
        this.name_list=[];
        this.drawBase();
        for(var i=0;i<this.raw_data_list.length;i++){
            this.addBar(this.raw_data_list[i].name,this.raw_data_list[i].height);
        }
    }
}

export {ctBarChart}

