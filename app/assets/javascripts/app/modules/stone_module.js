var Stone = Backbone.Model.extend({

  initialize: function() {
    this.on('change:user_id', function(model, user_id){
      this.save();
      game.events.trigger('stone-change', {stone_id: this.id});
    });
  }

});

var Stones = Backbone.Collection.extend({
  model: Stone,
  url: '/games/'+ game.id +'/stones',

});

var StoneView = Backbone.View.extend({

  initialize: function() {
    this.model.view = this;
  },

  updateSource: function() {
    this.srcX = 830;
    if (this.model.get('user_id')) {
      this.srcY = 660;
    } else {
      this.srcY = 600;
    }
  },

  updateSize: function() {
    if (this.model.get('user_id')) {
      this.width = 35;
      this.height = 28;
    } else {
      this.width = 46;
      this.height = 56;
    }
  },

  updateDraw: function() {
    var user_id = this.model.get('user_id');
    if (user_id) {
      this.drawX = this.model.get('position') * 90 + 28;
      if (game.user_id == user_id) {
        this.drawY = game.boardPositionIsUp() ? 58 : 512;
      } else {
        this.drawY = game.boardPositionIsUp() ? 512 : 58;
      }
    } else {
      this.drawX = this.model.get('position') * 90 + 22;
      this.drawY = 272;
    }
  },

  update: function() {
    this.updateSource();
    this.updateSize();
    this.updateDraw();
  },

  render: function() {
    game.ctxEntities.drawImage(game.imgSprite,
        this.srcX, this.srcY, this.width, this.height,
        this.drawX, this.drawY, this.width, this.height);
  }

});

var StonesView = Backbone.View.extend({

  initialize: function() {
    this.collection.on('add', this.addStone, this);
  },

  addStone: function(stone) {
    stoneView = new StoneView({model: stone});
  },

  update: function() {
    _.each(this.collection.models, function(stone){
      if (stone.view) {
        stone.view.update();
      }
    });
  },

  render: function() {
    _.each(this.collection.models, function(stone){
      if (stone.view) {
        stone.view.render();
      }
    });
  }

});

var StoneModule = (function() {

  function StoneModule() {
    this.stones = new Stones();
    this.stonesView = new StonesView({
      collection: this.stones
    });

    this.addHandlers();
  };

  StoneModule.prototype.addHandlers = function() {
    game.events.on('start-game', function(){
      this.stones.fetch({add: true});
    }, this);
    game.events.on('stone-changed', function(stone_info){
      this.stones.get(stone_info.stone_id).fetch({add: true});
    }, this);
  };

  return StoneModule;

})();

this.stoneModule = new StoneModule();
