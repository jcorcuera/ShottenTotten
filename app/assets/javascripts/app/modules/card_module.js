var Card = Backbone.Model.extend({

  initialize: function() {
    this.on('change:position_on_board', function(model, position_on_board){
      if (game.isMyTurn()) {
        this.set('position_on_hand', null);
        this.save({token: game.token()});
      } else {
        this.set(this.previousAttributes() ,{silent: true})
      }
    });
  }

});

var Cards = Backbone.Collection.extend({
  model: Card,
  url: function() {
    return '/games/'+ game.id +'/cards';
  }
});

var CardView = Backbone.View.extend({

  initialize: function() {
    this.model.view = this;
    this.width = 50;
    this.height = 56;
  },

  updatePositionOnHand: function() {
    this.drawX = (this.model.get('position_on_hand') - 1) * 90 + 155;
    this.drawY = game.boardPositionIsUp() ? 2 : 542;
  },

  updatePositionOnBoard: function() {
    var row = this.model.get('position_on_board') % 6;
    var col = Math.floor(this.model.get('position_on_board') / 6);
    this.drawX = col * 90 + 20;
    this.drawY = row * 60 + 92 + Math.floor(row/3) * 60;
  },

  updateSourceByValue: function() {
    //TODO: values will change in future?
    this.srcX = (this.model.get('value') - 1) * 90 + 20;
  },

  updateSourceByColor: function() {
    //TODO: values will change in future?
    color_index = _.indexOf(
      ['black', 'blue', 'green', 'red', 'orange', 'purple'],
      this.model.get('color')
    );
    this.srcY = color_index * 60 + 600;
  },

  update: function() {
    if (this.model.get('position_on_hand')) {
      this.updatePositionOnHand();
    } else {
      this.updatePositionOnBoard();
    }
    this.updateSourceByValue();
    this.updateSourceByColor();
  },

  render: function() {
    game.ctxEntities.drawImage(game.imgSprite,
        this.srcX, this.srcY, this.width, this.height,
        this.drawX, this.drawY, this.width, this.height);
  }

});

var CardsView = Backbone.View.extend({

  initialize: function() {
    this.collection.on('add', this.addCard, this);
    console.log('Listener added!');
  },

  addCard: function(card) {
    console.log('card Added');
    cardView = new CardView({model: card});
  },

  update: function() {
    _.each(this.collection.models, function(card){
      if (card.view) {
        card.view.update();
      }
    });
  },

  render: function() {
    _.each(this.collection.models, function(card){
      if (card.view) {
        card.view.render();
      }
    });
  }

});

var CardModule = (function() {

  function CardModule() {
    this.cards = new Cards();
    this.cardsView = new CardsView({
      collection: this.cards
    });

    this.addHandlers();
  };

  CardModule.prototype.addHandlers = function() {
    game.events.on('request-cards', function(){
      this.cards.fetch({add: true, data: {token: game.token()}});
    }, this);
  };

  return CardModule;

})();

this.cardModule = new CardModule();
