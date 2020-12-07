
 

program.init = function(canv){
  var canvas = document.getElementById("canv");
  var ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.arc(500, 500, 150, 0, 2 * Math.PI);
  ctx.lineWidth = 10;
  ctx.stroke();
  ctx.fillStyle = "#FF0000";
}
