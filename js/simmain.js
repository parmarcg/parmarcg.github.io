//var dpi = window.devicePixelRatio || 1;

// get canvas element from HTML
var canvas = document.getElementById("canv");
//get context
var ctx = canvas.getContext("2d");
//setup object counter
var clicked = 0;
//setup object storage array
var circles = [];
//variables for clicking to add planets
var clickx;
var clicky;

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
	  //When a resize is detected fun function
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
	//Run when the "ad too" button is clicked
    var arx = document.getElementById("arx");
	var ary = document.getElementById("ary");
	var volume = document.getElementById("volume");
	var den = document.getElementById("density");
    xval = arx.value  /  100;
    yval = ary.value  /  100;

	var xval = (xval * canvas.width);
	var yval = (yval * canvas.height);
	var vol = parseInt(volume.value);
	var dens = parseInt(den.value);
	
    circles.push([xval, yval, vol, dens]);
    //starting x value of objects, creating a 2d array entry for each object
	document.getElementById("createbody").innerHTML = "add to " + clicked;
	//changes the html to reflect how many objects have been created
	clicked = clicked + 1;
	}; 

canvas.addEventListener(
  "click",
  clickevent => {
    var clickx = clickevent.clientX;
	var xval = parseInt(clickx.value);
    var clicky = clickevent.clientY;
	var yval = parseInt(clicky.value);
	var volume = document.getElementById("volume");
	var vol = parseInt(volume.value);
	var den = document.getElementById("density");
	var dens = parseInt(den.value);
    circles.push([clickx, clicky, vol, dens]);
	//document.getElementById("createbody").innerHTML = "add to " + clicked;
	clicked = clicked + 1;
  }
)
	
function draw(){	
// draws circles
    console.log("Draw");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < circles.length; i++) {
      circles[i][0] += 1;
	  circles[i][1] += 1;
      ctx.beginPath();
      ctx.arc(circles[i][0], circles[i][1], circles[i][2], 0, 2 * Math.PI);
      ctx.lineWidth = circles[i][3];
      ctx.strokeStyle = "ffffff";
      ctx.fill();
      ctx.stroke();
    } 
};

window.setInterval(function(){ draw(); }, 1000/60);




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
  
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(arx, ary, 10, 0, 2 * Math.PI);
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.fillStyle = "ffffff";
 
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
