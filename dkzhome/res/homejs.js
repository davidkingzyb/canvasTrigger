window.onload=function(){
	fullPage();
	var canvas=document.getElementById("dkzlogo");
	var context=canvas.getContext('2d');
	var DKZlogo=new DKZLogoClass(context,30);
	DKZlogo.drawDKZ('stroke');
	setTimeout(DKZlogo.animateDKZ(),2000);
	canvas.onclick=function(){
		DKZlogo.fillrandomDKZ();
	};
};

//===============full page===========

var conY;//con y coodination array
function setHomeWH(){
	var homecon=document.getElementById('homecon');
	var skillcon=document.getElementById('skillcon');
	var expcon=document.getElementById('expcon');
	var contactcon=document.getElementById('contactcon');

	homecon.style.width='100%';
	homecon.style.height=window.innerHeight+'px';
	homecon.style.backgroundColor='#222';

	skillcon.style.width='100%';
	skillcon.style.height=window.innerHeight+'px';
	skillcon.style.backgroundColor='#eee';

	expcon.style.width='100%';
	expcon.style.height=window.innerHeight+'px';
	expcon.style.backgroundColor='#0f0';

	contactcon.style.width='100%';
	contactcon.style.height=window.innerHeight+'px';
	contactcon.style.backgroundColor='#222';

	var homeconY=homecon.getBoundingClientRect().top+document.body.scrollTop;
	var skillconY=skillcon.getBoundingClientRect().top+document.body.scrollTop;
	var expconY=expcon.getBoundingClientRect().top+document.body.scrollTop;
	var contactconY=contactcon.getBoundingClientRect().top+document.body.scrollTop;
	
	conY=[homeconY,skillconY,expconY,contactconY];
}

function fullPage(){
	setHomeWH();

	var navul=document.getElementById('navul');
	var nowCon=0;
	setNowCon(nowCon);
	window.scrollTo(0,0);
	if(window.location.hash==='#contact'){
		nowCon=3;
		var toY=conY[nowCon];
		scrollToAnimate(toY,function(){
			setNowCon(nowCon);
		});
	}

	navul.onclick=function(e){
		nowCon=Number(e.target.id.substring(3));
		var toY=conY[nowCon];
		startScroll(nowCon);
		scrollToAnimate(toY,function(){
			setNowCon(nowCon);
		});
	}

	var prevY=0;

	window.onscroll=function(e){
		var nowY=document.documentElement.scrollTop+document.body.scrollTop;
		if(nowY>prevY&&!isscrolling){
			if(nowCon<3){
				nowCon++;
				startScroll(nowCon);
				scrollToAnimate(conY[nowCon],function(){
					setNowCon(nowCon);
				});
			}

		}else if(prevY>nowY&&!isscrolling){
			if(nowCon>0){
				nowCon--;
				startScroll(nowCon);
				scrollToAnimate(conY[nowCon],function(){
					setNowCon(nowCon);
				});
			}
		}
		prevY=nowY;
	}
	window.onresize=function(){
		setHomeWH();
	}
}

var isInitSkillTree=false;//skill tree state lock
function startScroll(nowCon){
	if(isInitSkillTree&&nowCon!==1){
		skillTreeReturn(window['skilltreectcanvas'],window['groupnode'],window['groupnode2'],window['groupline'],window['groupline2']);
	}
	if(isInitSkillTree&&nowCon===1){
		skillTreeBoom(window['skilltreectcanvas'],window['skillhead']);
	}
	if(nowCon===1&&!isInitSkillTree){
		window['skilltreectcanvas']=skilltree();
	}
	
}

var isscrolling=false;//scolling lock
function scrollToAnimate(y,callback){
	if(!isscrolling){
	isscrolling=true;
	var nowY=document.documentElement.scrollTop+document.body.scrollTop;
	var step=(y-nowY)/30;
	nowY+=step*5;
	window.scrollTo(0,nowY);
	var count=25;
	function animateloop(){
		nowY+=step;
		count--;
		window.scrollTo(0,nowY);
		if(count>0){
			setTimeout(animateloop,20);
		}else{
			setTimeout(function(){
				if(callback){
					callback();
				}
				isscrolling=false;
			},30)
		}
	}
	animateloop();

	}
	
}
function setNowCon(nowCon){
	document.getElementById('nav0').className='';
	document.getElementById('nav1').className='';
	document.getElementById('nav2').className='';
	document.getElementById('nav3').className='';
	var nav=document.getElementById('nav'+nowCon).className='navNow';
}

//=================dkz logo=================

var DKZLogoClass=(function(){
	function DKZLogoClass(context,scale){
		this.context=context;
		this.w=Math.sqrt(3)*scale;
		this.h=scale;
	}

	var d={};

	d.drawWhite1=function(context,w,h){
		context.moveTo(1*w,7*h);
		context.lineTo(1*w,15*h);
		context.lineTo(2*w,16*h);
		context.lineTo(2*w,8*h);
		context.lineTo(1*w,7*h);
	};
	d.drawWhite2=function(context,w,h){
		context.moveTo(1*w,7*h);
		context.lineTo(3*w,5*h);
		context.lineTo(3*w,7*h);
		context.lineTo(2*w,8*h);
		context.lineTo(1*w,7*h);
	};

	d.drawWhite3=function(context,w,h){
		context.moveTo(3*w,5*h);
		context.lineTo(3*w,7*h);
		context.lineTo(4*w,6*h);
		context.lineTo(3*w,5*h);
	};
	d.drawWhite4=function(context,w,h){
		context.moveTo(4*w,6*h);
		context.lineTo(3*w,7*h);
		context.lineTo(4*w,8*h);
		context.lineTo(4*w,6*h);
	};
	d.drawWhite5=function(context,w,h){
		context.moveTo(4*w,6*h);
		context.lineTo(5*w,7*h);
		context.lineTo(4*w,8*h);
		context.lineTo(4*w,6*h);
	};
	d.drawWhite6=function(context,w,h){
		context.moveTo(5*w,7*h);
		context.lineTo(4*w,8*h);
		context.lineTo(4*w,12*h);
		context.lineTo(5*w,11*h);
		context.lineTo(5*w,7*h);
	};
	d.drawWhite7=function(context,w,h){
		context.moveTo(4*w,12*h);
		context.lineTo(3*w,13*h);
		context.lineTo(4*w,14*h);
		context.lineTo(4*w,12*h);
	};
	d.drawWhite8=function(context,w,h){
		context.moveTo(4*w,14*h);
		context.lineTo(2*w,16*h);
		context.lineTo(2*w,8*h);
		context.lineTo(3*w,7*h);
		context.lineTo(4*w,8*h);
		context.lineTo(3*w,9*h);
		context.lineTo(3*w,13*h);
		context.lineTo(4*w,14*h);
	};
	d.drawWhite9=function(context,w,h){
		context.moveTo(4*w,12*h);
		context.lineTo(5*w,13*h);
		context.lineTo(5*w,11*h);
		context.lineTo(4*w,12*h);
	};
	d.drawWhite10=function(context,w,h){
		context.moveTo(4*w,4*h);
		context.lineTo(5*w,5*h);
		context.lineTo(5*w,7*h);
		context.lineTo(4*w,6*h);
		context.lineTo(4*w,4*h);
	};
	d.drawWhite11=function(context,w,h){
		context.moveTo(4*w,4*h);
		context.lineTo(5*w,3*h);
		context.lineTo(6*w,4*h);
		context.lineTo(5*w,5*h);
		context.lineTo(4*w,4*h);
	};
	d.drawWhite12=function(context,w,h){
		context.moveTo(5*w,5*h);
		context.lineTo(6*w,4*h);
		context.lineTo(6*w,6*h);
		context.lineTo(7*w,5*h);
		context.lineTo(7*w,7*h);
		context.lineTo(8*w,6*h);
		context.lineTo(8*w,10*h);
		context.lineTo(7*w,11*h);
		context.lineTo(7*w,9*h);
		context.lineTo(6*w,10*h);
		context.lineTo(6*w,12*h);
		context.lineTo(5*w,13*h);
		context.lineTo(5*w,5*h);
	};
	d.drawWhite13=function(context,w,h){
		context.moveTo(6*w,2*h);
		context.lineTo(7*w,1*h);
		context.lineTo(8*w,2*h);
		context.lineTo(7*w,3*h);
		context.lineTo(6*w,2*h);
	};
	d.drawWhite14=function(context,w,h){
		context.moveTo(7*w,3*h);
		context.lineTo(8*w,2*h);
		context.lineTo(8*w,4*h);
		context.lineTo(7*w,5*h);
		context.lineTo(7*w,3*h);
	};
	d.drawWhite15=function(context,w,h){
		context.moveTo(8*w,2*h);
		context.lineTo(9*w,1*h);
		context.lineTo(12*w,4*h);
		context.lineTo(11*w,5*h);
		context.lineTo(8*w,2*h);
	};
	d.drawWhite16=function(context,w,h){
		context.moveTo(12*w,4*h);
		context.lineTo(12*w,8*h);
		context.lineTo(11*w,7*h);
		context.lineTo(11*w,5*h);
		context.lineTo(12*w,4*h);
	};
	d.drawWhite17=function(context,w,h){
		context.moveTo(12*w,8*h);
		context.lineTo(11*w,9*h);
		context.lineTo(11*w,7*h);
		context.lineTo(12*w,8*h);
	};
	d.drawWhite18=function(context,w,h){
		context.moveTo(11*w,9*h);
		context.lineTo(10*w,8*h);
		context.lineTo(11*w,7*h);
		context.lineTo(11*w,9*h);
	};
	d.drawWhite19=function(context,w,h){
		context.moveTo(10*w,8*h);
		context.lineTo(11*w,7*h);
		context.lineTo(11*w,5*h);
		context.lineTo(8*w,2*h);
		context.lineTo(8*w,4*h);
		context.lineTo(10*w,6*h);
		context.lineTo(10*w,8*h);
	};
	d.drawWhite20=function(context,w,h){
		context.moveTo(8*w,6*h);
		context.lineTo(8*w,10*h);
		context.lineTo(11*w,13*h);
		context.lineTo(11*w,11*h);
		context.lineTo(10*w,10*h);
		context.lineTo(10*w,8*h);
		context.lineTo(8*w,6*h);
	};
	d.drawWhite21=function(context,w,h){
		context.moveTo(11*w,13*h);
		context.lineTo(12*w,12*h);
		context.lineTo(12*w,10*h);
		context.lineTo(11*w,11*h);
		context.lineTo(11*w,13*h);
	};
	d.drawBlack5=function(context,w,h){
		context.moveTo(12*w,10*h);
		context.lineTo(11*w,11*h);
		context.lineTo(10*w,10*h);
		context.lineTo(11*w,9*h);
		context.lineTo(12*w,10*h);
	};
	d.drawBlack4=function(context,w,h){
		context.moveTo(9*w,5*h);
		context.lineTo(8*w,6*h);
		context.lineTo(10*w,8*h);
		context.lineTo(10*w,6*h);
		context.lineTo(9*w,5*h);
	};
	d.drawBlack1=function(context,w,h){
		context.moveTo(3*w,11*h);
		context.lineTo(4*w,12*h);
		context.lineTo(3*w,13*h);
		context.lineTo(3*w,11*h);
	};
	d.drawBlack2=function(context,w,h){
		context.moveTo(6*w,4*h);
		context.lineTo(7*w,5*h);
		context.lineTo(6*w,6*h);
		context.lineTo(6*w,4*h);
	};
	d.drawBlack3=function(context,w,h){
		context.moveTo(7*w,5*h);
		context.lineTo(8*w,6*h);
		context.lineTo(7*w,7*h);
		context.lineTo(7*w,5*h);
	};
	d.drawGrey1=function(context,w,h){
		context.moveTo(4*w,8*h);
		context.lineTo(4*w,12*h);
		context.lineTo(3*w,11*h);
		context.lineTo(3*w,9*h);
		context.lineTo(4*w,8*h);		
	};
	d.drawGrey2=function(context,w,h){
		context.moveTo(6*w,10*h);
		context.lineTo(7*w,9*h);
		context.lineTo(7*w,11*h);
		context.lineTo(6*w,10*h);
	};
	d.drawGrey3=function(context,w,h){
		context.moveTo(6*w,2*h);
		context.lineTo(6*w,4*h);
		context.lineTo(7*w,5*h);
		context.lineTo(7*w,3*h);
		context.lineTo(6*w,2*h);
	};
	d.drawGrey4=function(context,w,h){
		context.moveTo(11*w,9*h);
		context.lineTo(10*w,10*h);
		context.lineTo(10*w,8*h);
		context.lineTo(11*w,9*h);
	};
	function fillDKZ(context,color){
		context.closePath();
		context.fillStyle=color;
		context.fill();
		context.lineWidth=1;
		context.strokeStyle='#000000';
		context.stroke();
		context.beginPath();	
	}
	DKZLogoClass.prototype.drawDKZ=function(mood){
		var context=this.context;
		var h=this.h;
		var w=this.w;
		context.beginPath();

		for(var i=1;i<=21;i++){
			d['drawWhite'+i](context,w,h);
		}
		
		context.closePath();

		if(mood==='fill'){
			
			context.fillStyle='#cccccc';
			context.fill();
			context.lineWidth=1;
			context.strokeStyle='#000000';
			context.stroke();
		}
		if(mood==='stroke'){
			context.lineWidth=1;
			context.strokeStyle='#ffffff';
			context.stroke();
		}

		context.beginPath();

		for(var j=1;j<=5;j++){
			d['drawBlack'+j](context,w,h);
		}		

		context.closePath();

		if(mood==='fill'){
			
			context.fillStyle='#222222';
			context.fill();
			context.lineWidth=1;
			context.strokeStyle='#000000';
			context.stroke();
		}
		if(mood==='stroke'){
			context.lineWidth=1;
			context.strokeStyle='#ffffff';
			context.stroke();
		}

		context.beginPath();

		for(var k=1;k<=4;k++){
			d['drawGrey'+k](context,w,h);
		}
		

		context.closePath();

		if(mood==='fill'){
			
			context.fillStyle='#777777';
			context.fill();
			context.lineWidth=1;
			context.strokeStyle='#000000';
			context.stroke();
		}

		if(mood==='stroke'){
			context.lineWidth=1;
			context.strokeStyle='#ffffff';
			context.stroke();
		}
		
	};
	DKZLogoClass.prototype.animateDKZ=function(){
		var context=this.context;
		var h=this.h;
		var w=this.w;
		context.beginPath();
		var i=1;
		function loop(){
			d['drawWhite'+i](context,w,h);
			fillDKZ(context,'#cccccc');
			i++;
			if(i<=21){
				setTimeout(arguments.callee,100);
			}
		}
		loop();

		var j=1;
		function loop2(){
			d['drawGrey'+j](context,w,h);
			fillDKZ(context,'#777777');
			j++;
			if(j<=4){
				setTimeout(arguments.callee,700);
			}
		}
		loop2();

		var k=1;
		function loop3(){
			d['drawBlack'+k](context,w,h);
			fillDKZ(context,'#222222');
			k++;
			if(k<=5){
				setTimeout(arguments.callee,550);
			}
		}
		loop3();
	};
	DKZLogoClass.prototype.fillrandomDKZ=function(){
		var context=this.context;
		var h=this.h;
		var w=this.w;
		context.beginPath();
		var i=0;
		function loop(){
			var r=Math.random();
			if(r<0.2){
				d['drawGrey'+Math.ceil(Math.random()*4)](context,w,h);
			}else if(r<0.4){
				d['drawBlack'+Math.ceil(Math.random()*5)](context,w,h);
			}else{
				d['drawWhite'+Math.ceil(Math.random()*21)](context,w,h);
			}
			function randomColor(){
				var r=Math.ceil(Math.random()*255).toString(16);
				var g=Math.ceil(Math.random()*255).toString(16);
				var b=Math.ceil(Math.random()*255).toString(16);
				if(r.length===1){
					r=r+r;
				}
				if(g.length===1){
					g=g+g;
				}
				if(b.length===1){
					b=b+b;
				}
				var colorstr='#'+r+g+b;
				return colorstr;

			}
			fillDKZ(context,randomColor());
			i++;
			if(i<50){
				setTimeout(arguments.callee,50);
			}
		}
		loop();
		var that=this;
		setTimeout(function(){
			that.context.clearRect(0,0,680,500);
			that.drawDKZ('stroke');
		},3000);
		setTimeout(function(){
			that.drawDKZ('fill');
		},3300);
	};
	return DKZLogoClass;

})();

//=================skill tree================

function skilltree(){
	var ctcanvas=new ctCanvas('skilltree');
	ctcanvas.addTrigger('click');
	ctcanvas.addTrigger('mousemove');
	var core=new ctFillCircle('#333',300,300,5);
	var core1=new ctFillCircle('#444',300,300,5,0.1);
	var core2=new ctFillCircle('#444',300,300,5,0.1);
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
		
		var skillheadimg=new Image();
		skillheadimg.src='res/img/skillhead.png';
		skillheadimg.onload=function(){
			skillhead=new ctDrawImg(skillheadimg,225,225);
			ctcanvas.addObj(skillhead);
			window['skillhead']=skillhead;
			skillTreeBoom(ctcanvas,skillhead);
		};
	}
	return ctcanvas;
}
var isBoomed=false;//skill tree state lock
function skillTreeBoom(ctcanvas,skillhead){
	if(!isBoomed){
		isBoomed=true;
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
		boom1();
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

			ctcanvas.removeObj(skillhead);
			ctcanvas.addObj(skillhead);

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
		function boomNode(skillnode,sx,sy){
			var ex=skillnode.x;
			var ey=skillnode.y;
			skillnode.x=sx||270;
			skillnode.y=sy||270;
			skillnode.alpha=1;
			skillnode.to({x:ex,y:ey},500);
		}

		var nodeThreejs=new skillNode('Threejs','#f6d346',440,140,0.01);
		var nodetypescript=new skillNode('TypeScript','#f6d346',484,232,0.01);
		var nodeegret=new skillNode('egret','#f6d346',580,215,0.01);
		var nodejQuery=new skillNode('jQuery','#f6d346',477,331,0.01);
		var nodeLESS=new skillNode('LESS','#ffb415',360,468,0.01);
		var nodedjango=new skillNode('django','#574498',91,450,0.01);
		var nodeservlet=new skillNode('Servlet','#574498',39,270,0.01);
		var nodeMySQL=new skillNode('MySQL','#2e2a69',96,74,0.01);
		var groupnode2=[nodeThreejs,nodetypescript,nodeegret,nodejQuery,nodeLESS,nodedjango,nodeservlet,nodeMySQL];
		var groupline2=[];
		function boom2(){

			lineNode2(nodeMySQL,nodeSQL.x+30,nodeSQL.y+30);
			lineNode2(nodeservlet,nodeJava.x+30,nodeJava.y+30);
			lineNode2(nodedjango,nodepython.x+30,nodepython.y+30);
			lineNode2(nodeLESS,nodeCSS.x+30,nodeCSS.y+30);
			lineNode2(nodetypescript,nodeJS.x+30,nodeJS.y+30);
			lineNode2(nodeegret,nodetypescript.x+30,nodetypescript.y+30);
			lineNode2(nodeThreejs,nodeJS.x+30,nodeJS.y+30);
			lineNode2(nodejQuery,nodeJS.x+30,nodeJS.y+30);

			ctcanvas.addObjs(groupline2);
			ctcanvas.removeObjs(groupnode);
			ctcanvas.addObjs(groupnode);
			ctcanvas.addObjs(groupnode2);

			boomNode(nodeMySQL,nodeSQL.x,nodeSQL.y);
			boomNode(nodeservlet,nodeJava.x,nodeJava.y);
			boomNode(nodedjango,nodepython.x,nodepython.y);
			boomNode(nodeLESS,nodeCSS.x,nodeCSS.y);
			boomNode(nodeThreejs,nodeJS.x,nodeJS.y);
			boomNode(nodetypescript,nodeJS.x,nodeJS.y);
			boomNode(nodejQuery,nodeJS.x,nodeJS.y);
			boomNode(nodeegret,nodeJS.x,nodeJS.y);

			setTimeout(function(){
				for(var j=0;j<groupline2.length;j++){
					groupline2[j].to({alpha:1},300);
				}
				setTimeout(bind(),500);
			},600);
			
		}
		function lineNode(skillnode,x,y){
			var line=new ctLine(skillnode.fillStyle,x||300,y||300,skillnode.x+30,skillnode.y+30,2,0.01);
			groupline.push(line);
		}
		function lineNode2(skillnode,x,y){
			var line=new ctLine(skillnode.fillStyle,x||300,y||300,skillnode.x+30,skillnode.y+30,2,0.01);
			groupline2.push(line);
		}
		function bind(){
			window['groupnode']=groupnode;
			window['groupnode2']=groupnode2;
			window['groupline']=groupline;
			window['groupline2']=groupline2;
			for(var i=0;i<groupnode.length;i++){
				bindNode(groupnode[i]);
			}
			for(var j=0;j<groupnode2.length;j++){
				bindNode(groupnode2[j]);
			}
			isInitSkillTree=true;
			window['skillhead'].on('click',function(){
				if(isBoomed){
					skillTreeReturn(window['skilltreectcanvas'],window['groupnode'],window['groupnode2'],window['groupline'],window['groupline2']);
				}else{
					skillTreeBoom(window['skilltreectcanvas'],window['skillhead']);
				}
			});

		}
		function bindNode(node){
			node.on('click',function(){
				node.r=30;
				var headimg=new Image();
				headimg.src='res/img/'+node.nodetext.toLowerCase()+'.png';
				headimg.onload=function(){
					window['skillhead'].img=headimg;
					ctcanvas.drawCanvas();
				};
				nodeOnClick(node.nodetext);
				setTimeout(function(){
					node.r=25;
					ctcanvas.drawCanvas();
				},200);
			});
			node.on('mousemove',function(){
				if(node.r===25){
					node.r=30;
					ctcanvas.drawCanvas();
					setTimeout(function(){
						node.r=25;
						ctcanvas.drawCanvas();
					},500);
				}
			})
			
		}

	}
	
}

function skillTreeReturn(ctcanvas,groupnode,groupnode2,groupline,groupline2){
	var headimg=new Image();
	headimg.src='res/img/skillhead.png';
	headimg.onload=function(){
		window['skillhead'].img=headimg;
		ctcanvas.removeObj(window['skillhead']);
		ctcanvas.addObj(window['skillhead']);
		ctcanvas.drawCanvas();
	};
	ctcanvas.removeObjs(groupline);
	ctcanvas.removeObjs(groupline2);
	for(var i=0;i<groupnode.length;i++){
		groupnode[i].to({x:270,y:270},500);
	}
	for(var j=0;j<groupnode2.length;j++){
		groupnode2[j].to({x:270,y:270},500);
	}
	setTimeout(function(){
		ctcanvas.removeObjs(groupnode);
		ctcanvas.removeObjs(groupnode2);
		isBoomed=false;
		window['skillhead'].on('click',function(){
				if(isBoomed){
					skillTreeReturn(window['skilltreectcanvas'],window['groupnode'],window['groupnode2'],window['groupline'],window['groupline2']);
				}else{
					skillTreeBoom(window['skilltreectcanvas'],window['skillhead']);
				}
			});
	},600);
}
function nodeOnClick(nodetext){
	console.log(nodetext);
}

//skillTreeReturn(window['skilltreectcanvas'],window['groupnode'],window['groupnode2'],window['groupline'],window['groupline2']);
//skillTreeBoom(window['skilltreectcanvas'],window['skillhead']);


