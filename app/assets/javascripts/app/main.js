var Game;

Game = (function() {

  function Game() {
    this.fetchUserInfo = __bind(this.fetchUserInfo, this);
    this.processInfo = __bind(this.processInfo, this);
    this.load = __bind(this.load, this);
    this.init = __bind(this.init, this);
    this.begin = __bind(this.begin, this);

    this.events = _.extend({}, Backbone.Events);

    this.fetchUserInfo();
  };

  Game.prototype.template = function(name, context) {
    return JST['app/templates/' + name](context);
  };

  Game.prototype.processInfo = function(info) {
    this.socketURL = info.socketURL;
    this.user_id = info.id;
    this.events.trigger('connect-info', info);
  };

  Game.prototype.fetchUserInfo = function() {
    $.ajax({
      url: '/games/user_info.json',
      success: this.processInfo
    });
  };

  Game.prototype.load = function() {
    this.events.trigger('load', {})
    this.canvasBg = document.getElementById("canvasBg");
    this.ctxBg = canvasBg.getContext("2d");
    this.canvasEntities = document.getElementById("canvasEntities");
    this.ctxEntities = canvasEntities.getContext("2d");
    this.canvasWidth = canvasBg.width;
    this.canvasHeight = canvasBg.height;
    this.isPlaying = false;
    this.imgSprite = new Image();
    this.imgSprite.src = "/assets/sprite.png";
    this.imgSprite.addEventListener("load", this.init, false);
  };


  Game.prototype.init = function() {
    this.begin();
  }

  Game.prototype.begin = function() {
    this.ctxBg.drawImage(this.imgSprite,
        0, 0, this.canvasWidth, this.canvasHeight,
        0, 0, this.canvasWidth, this.canvasHeight);
  }

 return Game;

})();

this.game = new Game();

