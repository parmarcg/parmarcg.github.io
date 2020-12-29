var dpi = window.devicePixelRatio || 1;
var arx = 100;
var ary = 100;
var canvas = document.getElementById("canv");
var ar = canvas.getContext("2d");


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

function circ(){
  
  
  ar.clearRect(0, 0, canvas.width, canvas.height);
  ar.beginPath();
  ar.arc(arx, ary, 10, 0, 2 * Math.PI);
  ar.lineWidth = 5;
  ar.stroke();
  ar.fillStyle = "#FF0000";
 
}

var body = "new"

function initializesim(canvas){

  moveCirc();


}
canvashandler.initialize(canvas);
canvashandler.autoResize();
initializesim();
