// binds the function to the current object
__bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
