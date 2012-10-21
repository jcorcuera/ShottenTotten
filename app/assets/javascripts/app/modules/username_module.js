var UsernameView = Backbone.View.extend({

  className: 'modal',

  events: {
    "keypress input": "doneWithEnter",
    "click #done": "done"
  },

  doneWithEnter: function(e) {
    if (e.keyCode == 13) {
      this.done(e)
    }
  },

  done: function(e) {
    var username = this.$el.find('input').val();
    if (username == '') { username = 'Anonyous'; }
    game.events.trigger('credentials-entered', username);
    this.$el.modal('hide');
    e.preventDefault();
  },

  render: function() {
    var temp = game.template('username_modal', {});
    this.$el.html(temp);
    this.$el.modal();
    this.$el.find('input').focus();
  }

});

var UsernameModule;

UsernameModule = (function() {

  function UsernameModule() {
    this.eventHandlers();
    this.usernameView = new UsernameView();
  };

  UsernameModule.prototype.eventHandlers = function() {
    var _this = this;
    game.events.on('start',  function(){
      _this.usernameView.render()
    });
  };

  return UsernameModule;

})();

new UsernameModule();
