var Game;

Game = (function() {

  function Game() {
    this.fetchUserInfo = __bind(this.fetchUserInfo, this);
    this.processInfo = __bind(this.processInfo, this);
    this.requestCards = __bind(this.requestCards, this);
    this.load = __bind(this.load, this);
    this.init = __bind(this.init, this);
    this.begin = __bind(this.begin, this);
    this.update = __bind(this.update, this);
    this.draw = __bind(this.draw, this);
    this.loop = __bind(this.loop, this);

    this.id = game_id;

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

  Game.prototype.token = function() {
    if (game.user) {
      return game.user.get('token');
    }
  };

  Game.prototype.requestCards = function() {
    console.log('requesting cards...');
    if (this.token()) {
      this.events.trigger('request-cards');
    } else {
      console.log('delaying ...');
      setTimeout(this.requestCards, 2 * 1000);
    }
  };

  Game.prototype.isMyTurn = function() {
    return this.model.get('turn_id') == this.user_id;
  };

  Game.prototype.boardPositionIsUp = function() {
    return this.user.get('position') == 0;
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
  }

  Game.prototype.begin = function() {
    this.ctxBg.drawImage(this.imgSprite,
        0, 0, this.canvasWidth, this.canvasHeight,
        0, 0, this.canvasWidth, this.canvasHeight);
    this.requestCards();
    this.isPlaying = true;
    requestAnimationFrame(this.loop);
  }

  Game.prototype.update = function() {
    this.ctxEntities.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    cardModule.cardsView.update();
  }

  Game.prototype.draw = function() {
    cardModule.cardsView.render();
  }

  Game.prototype.loop = function() {
    if (this.isPlaying) {
      this.update();
      this.draw();
      requestAnimationFrame(this.loop);
    }
  }

 return Game;

})();

this.game = new Game();

