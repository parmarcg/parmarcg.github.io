//var dpi = window.devicePixelRatio || 1;

//approximate Graitational Constant (can be changed to affect how strong gravity in the simulation acts)
const g = 0.4
//add a softening constant to prevent infinite gravity
const s = 100000

var acx = 0
var acy = 0
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
/*
var calfreq = 100;
var spacetimeloop;
function recursiveCirc(){
  var forward;
  posspacetimeloop = setInterval(function(forward){
    circlemoves();
  }, 1000/30);}
*/	
function calculateangvel(ang, velo){
	ang = ang * (Math.PI / 180);
	//convert angle from degrees to radians
	if ( ang <= Math.PI / 2){
      velx = Math.sin(ang) * velo;
	  vely = 0 - Math.cos(ang) * velo;
	}
	else if (ang > Math.PI/2 && ang <= Math.PI ){
	  var subang = ang - Math.PI / 2;
	  velx = Math.cos(subang) * velo;
	  vely = Math.sin(subang) * velo;
	}
	else if (ang > Math.PI && ang <= 1.5 * Math.PI ){
	  var subang = ang - Math.PI;
	  velx = 0 - Math.sin(subang) * velo;
	  vely = Math.cos(subang) * velo;
	}
	else if (ang > 1.5 * Math.PI && ang <= 2 * Math.PI){
		var subang = ang - 1.5 * Math.PI;
	  velx = 0 - Math.cos(subang) * velo;
	  vely = 0- Math.sin(subang) * velo;
	}
	//using sin cos tan calculate opposite and adjacent angles from magnitude velocity given in "velo".
	//Opposite and adjacent angles reflect the velocity along the X axis and the velocity along the Y axis, but switch based on where the angle is,
	//which is why four if statements are required.
}

	
function generate(){
	//Runs when the "ad too" button is clicked
    var arx = document.getElementById("arx");
	var ary = document.getElementById("ary");
	var volume = document.getElementById("volume");
	var den = document.getElementById("density");
	// Read values from HTML
    xval = arx.value  /  100;
    yval = ary.value  /  100;
    //create a percentage
	var xval = (xval * canvas.width);
	var yval = (yval * canvas.height);
	//use the percentage created to find the % value of canvas size
	var vol = parseInt(volume.value);
	var dens = parseInt(den.value);
	
	var velocity = document.getElementById("velo");
	var angle = document.getElementById("ang");
	
	var velo = parseInt(velocity.value);
	var ang = parseInt (angle.value);
	var mass = vol * dens
	calculateangvel(ang, velo);
	//send the angle to "calculate angular velocity"
    circles.push([xval, yval, vol, dens, velx, vely, mass, acx, acy]);
	//X POSITION, Y POSITION, VOLUME, DENSITY, X VELOCITY, Y VELOCITY, MASS, ACCELERATION X&Y
    //starting x value of objects, creating a 2d array entry for each object
	document.getElementById("createbody").innerHTML = "add to " + (clicked + 1);
	//changes the html to reflect how many objects have been created
	clicked = clicked + 1;
	//step up to reflect the amount of circles onscreen
	}; 

canvas.addEventListener(
  "click",
  //when the user clicks the canvas, start drawing a circle
  clickevent => {
    var clickx = clickevent.clientX;
	//get x value and y value of the mouseclick
	var xval = parseInt(clickx.value);
    var clicky = clickevent.clientY;
	var yval = parseInt(clicky.value);
	var volume = document.getElementById("volume");
    // Read values from HTML
	var vol = parseInt(volume.value);
	var den = document.getElementById("density");
	var dens = parseInt(den.value);
	var velocity = document.getElementById("velo");
	var velo = parseInt(velocity.value);
	var angle = document.getElementById("ang");
	var ang = parseInt (angle.value);
	var mass = vol * dens
	calculateangvel(ang, velo);
	//send the angle to "calculate angular velocity"
    circles.push([clickx, clicky, vol, dens, velx, vely, mass, acx, acy]);
	//X POSITION, Y POSITION, VOLUME, DENSITY, X VELOCITY, Y VELOCITY, MASS, ACCELERATION X&Y
	document.getElementById("createbody").innerHTML = "add to " + (clicked + 1);
	//document.getElementById("createbody").innerHTML = "add to " + clicked;
	clicked = clicked + 1;
	//step up to reflect the amount of circles onscreen
  }
)
	
function draw(){	
// draws circles
    /*onsole.log("Draw");*/
	//displays to the console its drawing a circle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	//wipe clean canvas to draw the next set of circles
    for (var x = 0; x < circles.length; x++) {
	   
	  //clear the acceleration values for every object
	  circles[x][7] = 0;
	  circles[x][8] = 0;
	 
	  
	  // for every circle in the array circles
      circles[x][0] += circles[x][4];
	  //add the velocity per 1000/60 second to x and y values of the circle
	  circles[x][1] += circles[x][5];
      ctx.beginPath();
      ctx.arc(circles[x][0], circles[x][1], circles[x][2], 0, 2 * Math.PI);
	  //      x position     y position     radius         start and end angle in RADIANS
	  //draw the circles onto the canvas
      ctx.lineWidth = 2;
      ctx.strokeStyle = "ffffff";
      ctx.fill();
      ctx.stroke();
	  
	 if (circles[x][0] <  0 - circles[x][2] || circles[x][0] > circles[x][2] + canvas.width || circles[x][1] < 0 - circles[x][2] || circles[x][1] > circles[x][2] + canvas.height){
	  circles.splice(x, 1);
	  document.getElementById("createbody").innerHTML = "add to " + (circles.length);
	}
		
	  
	}
	
	
	
    for (var x = 0; x < circles.length; x++) {

	  //n body problem implementation  
		for (var y = 0; y < circles.length; y++) {
		//calculate for every object
		if (x != y){			  
			deltax = circles[x][0] - circles[y][0];
			deltay = circles[x][1] - circles[y][1];
			//calculate distance to other circles along x and y planes
			var distancemagnitude = (deltax * deltax) + (deltay * deltay);
			//calculate overall distance
			var totalmass = circles[x][6] * circles[y][6];
			//calculate total mass
			f = (g * totalmass) / (distancemagnitude * Math.sqrt(distancemagnitude + s));
			//calcuale force acting on circle
			circles[x][7] += deltax * f / circles[x][6];
			circles[x][8] += deltay * f / circles[x][6];
			//add forces to x and y forces stored in the circles array
			
		  }
	  if (Math.sqrt(distancemagnitude) <= circles[x][2] + circles[y][2] && x != y){
		  var newposx = (circles[x][0] + circles[y][0]) / 2
		  var newposy = (circles[x][1] + circles[y][1]) / 2
		  var newvol = Math.sqrt(((Math.PI * circles[x][2] * circles[x][2]) + (Math.PI * circles[y][2] *circles[y][2]))/ Math.PI) 
		  var newdens = ((circles[x][3] * circles[x][2]) + (circles[y][3] * circles[y][2])) / (circles[x][2] + circles[y][2])
		  var newmass = (circles[x][6] + circles[y][6])
		  var newvelx = ((circles[x][4] * circles[x][6]) + (circles[y][4] * circles[x][6]))  / newmass
		  var newvely = ((circles[x][5] * circles[x][6]) + (circles[y][5] * circles[x][6])) / newmass
		  
		  
		  
		  circles.splice(x, 1);
		  circles.splice(y, 1);
		  
		  
		  circles.push([newposx, newposy, newvol, newdens, newvelx, newvely, newmass, 0, 0]);
		}

	 circles[x][4] -= circles[x][7];
	 circles[x][5] -= circles[x][8];
	 //Update velocities using new accelerations
	 }
    } 

};

window.setInterval(function(){ draw(); }, 1000/60);
//Draw is always running



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


function initializesim(canvas){

  //spin();
  //moveCirc();

}
canvashandler.initialize(canvas);
canvashandler.autoResize();
//run canvas resizer
//initializesim();
