var Game;

Game = (function() {

  function Game() {
    this.fetchUserInfo = __bind(this.fetchUserInfo, this);
    this.processInfo = __bind(this.processInfo, this);
    this.load = __bind(this.load, this);

    this.events = _.extend({}, Backbone.Events);

    this.fetchUserInfo();
  };

  Game.prototype.load = function() {
    this.events.trigger('load', {})
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

 return Game;

})();

this.game = new Game();

