var Stone = Backbone.Model.extend({

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
      this.stones.fetch();
    }, this);
    game.events.on('claim', function(id){
      Stone.get(id).fetch();
    }, this);
  };

  return StoneModule;

})();

this.stoneModule = new StoneModule();
