var Card = Backbone.Model.extend({
});

var Cards = Backbone.Collection.extend({
  model: Card,
  url: function() {
    return '/games/'+ game.id +'/cards?token='+ game.token();
  }
});

var CardView = Backbone.View.extend({
});

var CardsView = Backbone.View.extend({
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
      this.cards.fetch()
    }, this);
  };

  return CardModule;

})();

this.cardModule = new CardModule();
