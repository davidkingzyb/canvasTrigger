window.onload=function(){
	window['timelinectcanvas']=timelineInit();
}
function timelineInit(){
	var timelinectcanvas=new ctCanvas('timeline');
	timelinectcanvas.addTrigger('click');
	timelinectcanvas.addTrigger('mousedown');
	timelinectcanvas.addTrigger('mouseup');
	timelinectcanvas.addTrigger('mousemove');
	var scut=new timeNode('SCUT',"#f2a152",30,30,16);
	var bbt=new timeNode('BBT',"#36ac4b",30,72,13);
	var graduate=new timeNode('graduate',"#35ad98",30,196,7);
	var dialogue=new timeNode('对白',"#fff",30,249,9);
	var dkzhome=new timeNode('DKZ HOME',"#222",30,371,10);
	var artistZengxin=new timeNode('artist ZengXin',"#b28850",30,405,5);
	var cubex3=new timeNode('CUBEx3',"#48afd8",30,472,14);
	var paypal=new timeNode('Paypal payment',"#042e78",30,513,11);
	var meiriq=new timeNode('meiriq Game',"#fc631c",30,581,12);
	var solardefence=new timeNode('Solar Defence',"#000",30,608,3);
	var findspy=new timeNode('Find Spy',"#000",30,635,3);
	var doublecolor=new timeNode('Double Color',"#000",30,663,3);
	var egretInit=new timeNode('egretInit',"#0f0",30,691,6);
	var magicstrata=new timeNode('Magic Strata',"#000",30,719,3);
	var canvastrigger=new timeNode('canvasTrigger',"#f00",30,747,8);
	var esther=new timeNode('esther',"#fc62e4",30,776,4);
	var timeline=new ctLine('#000',30,30,30,30,4);
	timelinectcanvas.addObj(timeline);
	var timenodegroup=[scut,bbt,graduate,dialogue,dkzhome,artistZengxin,cubex3,paypal,meiriq,solardefence,findspy,doublecolor,egretInit,magicstrata,canvastrigger,esther];
	timelinectcanvas.addObjs(timenodegroup);
	var timelineanimate=animation(function(){
		if(timeline.ey<780){
			timeline.ey+=10;
		}else{
			clearInterval(timelineanimate);
		}
	},timelinectcanvas);
	for(var i=0;i<timenodegroup.length;i++){
		boomTime(timenodegroup[i]);
		bindTimeNode(timenodegroup[i]);
	}
	function bindTimeNode(timenode){
		timenode.on('mousemove',function(){
			timenode.textalpha=1;
			var textalphaanimate=animation(function(){
				if(timenode.textalpha>0.1){
					timenode.textalpha-=0.01;
				}else{
					clearInterval(textalphaanimate);
				}
			},timelinectcanvas);
		});
		timenode.on('mousedown',function(){
			timenode.textalpha=1;
			if(timenode.r>=3){
				timenode.r-=3;
			}
			timelinectcanvas.drawCanvas();
		});
		timenode.on('mouseup',function(){
			timenode.textalpha=0.1;
			if(timenode.r<16){
				timenode.r+=3;
			}
			timelinectcanvas.drawCanvas();
		});
		timenode.on('click',function(){clickTimeNode(timenode.timetitle);});

	}
	function boomTime(timenode){
		var ex=timenode.x;
		var ey=timenode.y;
		timenode.x=10;
		timenode.y=10;
		timenode.alpha=1;
		timenode.to({x:ex,y:ey},1000);
	}
	return timelinectcanvas;
}
function timelineReturn(timelinectcanvas){
	timelinectcanvas.reset();
	window['timelinectcanvas']=null;
}
function clickTimeNode(timenodetitle){
	console.log(encodeURI(timenodetitle).replace(/%/g,'_'));
}