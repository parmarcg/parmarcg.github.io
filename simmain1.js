var mousepos = new (mouseX, mouseY);
function init(){

  var canvas = document.getElementById("canv");
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 150, 0, 2 * Math.PI);
  ctx.lineWidth = 10;
  ctx.stroke();
  ctx.fillStyle = "#FF0000";
}

init()
