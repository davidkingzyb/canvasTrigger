window.onload=function(){
	skilltree();
};
function skilltree(){
	var ctcanvas=new ctCanvas('skilltree');
	ctcanvas.addTrigger('click');
	var core=new ctFillCircle('#333',300,300,5);
	var core1=new ctFillCircle('#444',300,300,5,.1);
	var core2=new ctFillCircle('#444',300,300,5,.1);
	var groupCore=[core2,core1,core];
	ctcanvas.addObjs(groupCore);
	var coreAnimate=animation(function(){	
		if(core.r<75){
			core.r+=5;
			core.x-=5;
			core.y-=5;
		}
		if(core1.r<160){
			core1.r+=5;
			core1.x-=5;
			core1.y-=5;
		}
		if(core2.r<250){
			core2.r+=5;
			core2.x-=5;
			core2.y-=5;
		}else{
			clearInterval(coreAnimate);
			skillArcAnimate();
		}
	},ctcanvas);
	var arcA=new skillArc('#f6d346',-55,35,75);
	var arcB=new skillArc('#d94c28',35,45,85);
	var arcC=new skillArc('#ffb415',45,75,75);
	var arcD=new skillArc('#574498',75,195,70);
	var arcE=new skillArc('#2e2a69',195,225,75);
	var arcF=new skillArc('#046aae',225,255,80);
	var arcG=new skillArc('#3ad591',255,305,70);
	var groupArc=[arcA,arcB,arcC,arcD,arcE,arcF,arcG];
	function skillArcAnimate(){
		
		
		arcAnimate(arcG,function(){
			arcAnimate(arcA,function(){
				arcAnimate(arcB,function(){
					arcAnimate(arcC,function(){
						arcToCircle();
					});
				});
			});
		});
		arcAnimate(arcD,function(){
			arcAnimate(arcE,function(){
				arcAnimate(arcF);
			});
		});
	}
	function arcAnimate(arc,callback){
		var sangle=arc.sangle;
		var eangle=arc.eangle;
		arc.eangle=sangle+5*Math.PI/180;
		ctcanvas.addObj(arc);
		var arcanimate=animation(function(){
			if(arc.eangle<eangle){
				arc.eangle+=5*Math.PI/180;
			}else{
				clearInterval(arcanimate);
				if(callback){
					callback();
				}
				
			}

		},ctcanvas);
	}
	function arcToCircle(){
		arcD.r-=5;
		arcB.r+=10;
		arcF.r+=5;
		arcG.r-=10;
		var arctocircleanimate=animation(function(){
			if(arcD.r<75){
				arcD.r++;
			}
			if(arcF.r>75){
				arcF.r--;
			}
			if(arcG.r<75){
				arcG.r++;
			}
			if(arcB.r>75){
				arcB.r--;
			}else{
				clearInterval(arctocircleanimate);
				circleToO();
			}
			
		},ctcanvas);
	}
	var skillhead;
	function circleToO(){
		
		arcA.sangle=-54*Math.PI/180;
		arcA.eangle=34*Math.PI/180;
		arcB.sangle=36*Math.PI/180;
		arcB.eangle=44*Math.PI/180;
		arcC.sangle=46*Math.PI/180;
		arcC.eangle=74*Math.PI/180;
		arcD.sangle=76*Math.PI/180;
		arcD.eangle=194*Math.PI/180;
		arcE.sangle=196*Math.PI/180;
		arcE.eangle=224*Math.PI/180;
		arcF.sangle=226*Math.PI/180;
		arcF.eangle=254*Math.PI/180;
		arcG.sangle=256*Math.PI/180;
		arcG.eangle=304*Math.PI/180;

		ctcanvas.drawCanvas();
		boom1();
		var skillheadimg=new Image();
		skillheadimg.src='res/img/skillhead.png';	
		skillheadimg.onload=function(){
			skillhead=new ctDrawImg(skillheadimg,225,225);
			ctcanvas.addObj(skillhead);
		}
	}
	var nodeJS=new skillNode('JS','#f6d346',395,248,0.01);
	var nodeHTML=new skillNode('HTML','#d94c28',428,404,0.01);
	var nodeCSS=new skillNode('CSS','#ffb415',325,370,0.01);
	var nodeJava=new skillNode('Java','#574498',110,270,0.01);
	var nodepython=new skillNode('python','#574498',158,380,0.01);
	var nodenodejs=new skillNode('nodejs','#574498',270,430,0.01);
	var nodeSQL=new skillNode('SQL','#2e2a69',96,170,0.01);
	var nodegit=new skillNode('git','#046aae',208,162,0.01);
	var nodePS=new skillNode('PS','#3ad591',310,72,0.01);
	var groupnode=[nodeJS,nodeHTML,nodeCSS,nodeJava,nodepython,nodenodejs,nodeSQL,nodegit,nodePS];
	var groupline=[];
	function boom1(){
		lineNode(nodeJS);
		lineNode(nodePS);
		lineNode(nodegit);
		lineNode(nodeCSS);
		lineNode(nodeHTML);
		lineNode(nodepython);
		lineNode(nodeJava,195,300);
		lineNode(nodeSQL);
		lineNode(nodenodejs,300,405);

		var linearc=new ctStrokeArc('#574498',2,300,300,105,90,180,0.01);
		groupline.push(linearc);

		ctcanvas.addObjs(groupline);
		ctcanvas.addObjs(groupnode);

		for(var i=0;i<groupnode.length;i++){
			boomNode(groupnode[i]);
		}
		setTimeout(function(){
			for(var j=0;j<groupline.length;j++){
				groupline[j].to({alpha:1},300);
			}
			setTimeout(boom2(),500);
		},600);
		
	}
	function boomNode(skillnode){
		var ex=skillnode.x;
		var ey=skillnode.y;
		skillnode.x=270;
		skillnode.y=270;
		skillnode.alpha=1;
		skillnode.to({x:ex,y:ey},500);
	}
	function boom2(){
		console.log('TODO')
	}
	function lineNode(skillnode,x,y){
		var line=new ctLine(skillnode.fillStyle,x||300,y||300,skillnode.x+30,skillnode.y+30,2,0.01);
		groupline.push(line);
	}
}