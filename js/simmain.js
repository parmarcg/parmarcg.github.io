var dpi = window.devicePixelRatio || 1;
var arx = 50;
var ary = 50;
var canvas = document.getElementById("canv");
var ar = canvas.getContext("2d");
var clicked = 0;
var list = [];


function resizeHandler(){
//Autoresizes the canvas when the brower window changes dimentions, this avoids "squashing" the canvas
  canvas.height = canvas.offsetHeight;
  canvas.width = canvas.offsetWidth;
    }

var canvashandler = {};
//sets up autoresizing
canvashandler.initialize = function(p_canvas){
  canvas = p_canvas;
}
canvashandler.autoResize = function(){

  window.onresize = function(){
    resizeHandler();
  };
    resizeHandler();
}

var calfreq = 100;
var spacetimeloop;
function recursiveCirc(){
  var forward;
  posspacetimeloop = setInterval(function(forward){
    circlemoves();
  }, 1000/30);}
	  
function generate(){
    var name = "Object " + clicked;
	list.push([clicked,0,name]);
	document.getElementById("createbody").innerHTML = "add to " + list[clicked][0];
    draw(clicked);
    clicked = clicked + 1;
	
}; 

function draw(id){
  list[id, 1] = list[id, 1] + 1;
  ar.clearRect(0, 0, canvas.width, canvas.height);
  ar.beginPath();
  ar.arc(list[id,1], ary, 100, 0, 2 * Math.PI);
  ar.lineWidth = 5;
  ar.stroke();
  ar.fillStyle = "ffffff";
  window.setTimeout(draw, 1000/60);
};



/*
function moveCirc() {
  arx = arx + 1;
  if ( arx < 200) {
    circ(); 
    window.setTimeout(moveCirc, 1000/60);
  }
  else { back()};
}

function back(){
  arx = arx - 1;
  if ( arx > 0) {
    circ();
    window.setTimeout(back, 1000/60);
  }
  else {moveCirc()};
}

function spin(){
  arx = arx + 1;
  ary = Math.sqrt(0-Math.pow(arx) + 100 * arx - 2250);
  circ();
  window.setTimeout(back, 1000/60)
  spin()
  }


function circ(){
  
  
  ar.clearRect(0, 0, canvas.width, canvas.height);
  ar.beginPath();
  ar.arc(arx, ary, 10, 0, 2 * Math.PI);
  ar.lineWidth = 5;
  ar.stroke();
  ar.fillStyle = "ffffff";
 
}
*/
var body = "new"

function initializesim(canvas){

  //spin();
  //moveCirc();

}
canvashandler.initialize(canvas);
canvashandler.autoResize();
initializesim();
