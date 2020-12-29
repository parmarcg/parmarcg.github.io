

var dpi = window.devicePixelRatio || 1;
var arx = 100;
var ary = 100;
var canvas = document.getElementById("canv");
var ar = canvas.getContext("2d")


function resizeHandler(){
  canvas.height = canvas.offsetHeight;
  canvas.width = canvas.offsetWidth;
    }

var publicApi = {};
publicApi.initialize = function(p_canvas){
  canvas = p_canvas;
}

publicApi.autoResize = function(){
  window.onresize = function(){
    resizeHandler();
  };
    resizeHandler();
}



function ppi() {
  var style_height = +getComputedStyle(canvas).getPropertyValue("hi").slice(0, -2);
  var style_width = +getComputedStyle(canvas).getPropertyValue("wi").slice(0, -2);

  canvas.setAttribute('hi', style_height * dpi);
  canvas.setAttribute('wi', style_width * dpi); 
}
ppi()

moveCirc()

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

