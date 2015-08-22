window.onload=function(){
    fullPage();
    init();
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
    //homecon.style.backgroundColor='#222';

    skillcon.style.width='100%';
    skillcon.style.height=window.innerHeight+'px';
    //skillcon.style.backgroundColor='#eee';

    expcon.style.width='100%';
    expcon.style.height=window.innerHeight+'px';
    expcon.style.backgroundColor='#aaa';

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
    // window.onresize=function(){
    //  setHomeWH();
    // }
}

var isInitSkillTree=false;//skill tree state lock
function startScroll(nowCon){
    // if(isInitSkillTree&&nowCon!==1){
    //     skillTreeReturn(window['skilltreectcanvas'],window['groupnode'],window['groupnode2'],window['groupline'],window['groupline2']);
    // }
    // if(isInitSkillTree&&nowCon===1){
    //     skillTreeBoom(window['skilltreectcanvas'],window['skillhead']);
    // }
    // if(nowCon===1&&!isInitSkillTree){
    //     var skillcircle=document.getElementById('skillcircle');
    //     var skillcircleanimate=setInterval(function(){
    //         if(skillcircle.style.opacity<1){
    //             skillcircle.style.opacity=Number(skillcircle.style.opacity)+0.1;
    //         }else{
    //             clearInterval(skillcircleanimate);
    //         }
    //     },100);
    //     window['skilltreectcanvas']=skilltree();
    // }
    // if(nowCon===2&&!window['timelinectcanvas']){
    //     window['timelinectcanvas']=timelineInit();
    // }
    // if(nowCon!==2&&window['timelinectcanvas']){
    //     timelineReturn(window['timelinectcanvas']);
    // }
    
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

   // once everything is loaded, we run our Three.js stuff.
function init() {

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight-0.7, 0.1, 1000);

    // create a render and set the size
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColorHex();
    renderer.setClearColor(new THREE.Color(0x333333));
    renderer.setSize(window.innerWidth, window.innerHeight*2);

    // show axes in the screen
    var axes = new THREE.AxisHelper(20);
    scene.add(axes);

    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(25, 25);
    var planeMaterial = new THREE.MeshBasicMaterial({color: 0xdddddd});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = -3;

    // add the plane to the scene
    scene.add(plane);


    // position and point the camera to the center of the scene
    camera.position.x = -30;
    camera.position.y = 20;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    // add the output of the renderer to the html element
    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    // render the scene
    renderer.render(scene, camera);
}