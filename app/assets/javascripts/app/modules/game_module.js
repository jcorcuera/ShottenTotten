var GameModel = Backbone.Model.extend({
  urlRoot: '/games',

  initialize: function() {
    game.events.on('request-cards', this.fetch, this);
    game.events.on('next-turn', this.fetch, this);
  }

});

game.model = new GameModel({id: game.id})
