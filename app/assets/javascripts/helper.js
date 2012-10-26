// binds the function to the current object
__bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

function __calculate_coordinates_on_canvas(canvas, e){
  return {x: e.pageX - canvas.offsetLeft, y: e.pageY - canvas.offsetTop}
}
