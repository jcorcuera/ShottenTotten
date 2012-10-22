var User = Backbone.Model.extend({

  isMe: function() {
    return this.id == game.user_id;
  }

});

var Users = Backbone.Collection.extend({
  model: User
});

var UserView = Backbone.View.extend({

  className: 'user',

  render: function() {
    var temp = game.template('user', this.model.toJSON());
    this.$el.html(temp);
    return this;
  }

});

var UsersView = Backbone.View.extend({

  initialize: function() {
    this.collection.on('add', this.addUser, this);
  },

  addUser: function(user) {
    if (this.collection.length == 1) {
      this.$el.html(game.template('waiting_oponent', {}));
    } else if (this.collection.length == 2) {
      this.$el.html('');
      var userView1 = new UserView({model: this.collection.at(0)});
      var userView2 = new UserView({model: this.collection.at(1)});
      this.$el.append(userView1.render().el);
      this.$el.append("<span class='block'>VS</div>");
      this.$el.append(userView2.render().el);
    }
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
    game.events.on('users-connected', function(users){
      this.users.add(users);
    }, this);
    game.events.on('new-user-connected', function(user){
      this.users.add(user);
    }, this);
  };

  return UserModule;

})();

this.userModule = new UserModule();
