var User = Backbone.Model.extend({});

var Users = Backbone.Collection.extend({
  model: User
});

var UserView = Backbone.View.extend({

  className: 'user',

  render: function() {
    var temp = game.template('user', this.model.toJSON());
    this.$el.html(temp);
    return this.$el;
  }

});

var UsersView = Backbone.View.extend({

  initialize: function() {
    this.collection.on('add', this.addUser, this);
  },

  addUser: function(user) {
    var userView = new UserView({model: user});
    this.$el.append(userView.render());
  }

});

var UserModule = (function() {

  function UserModule() {
    this.users = new Users();
    this.usersView = new UsersView({
      collection: this.users,
      el: '#users'
    });

    this.addHandlers();
  };

  UserModule.prototype.addHandlers = function() {
    var _this = this;
    game.events.on('new-user-connected', function(user){
      console.log('new-user-connected');
      _this.users.add(user);
    });
  };

  return UserModule;

})();

this.userModule = new UserModule();
