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
  }

});

var StonesView = Backbone.View.extend({

  initialize: function() {
    this.collection.on('add', this.addStone, this);
  },

  addCard: function(stone) {
    stoneView = new StoneView({model: stone});
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
      this.stones.get(stone_info.id).fetch({add: true});
    }, this);
  };

  return StoneModule;

})();

this.stoneModule = new StoneModule();
