var User = Backbone.Model.extend({

  initialize: function() {
    if (this.isMe()) {
      game.user = this;
      this.requestToken();
    }
  },

  isMe: function() {
    return this.id == game.user_id;
  },

  requestToken: function() {
    var _this = this;
    $.ajax({
      type: 'POST',
      url: '/games/'+ game.id +'/users',
      data: this.toJSON(),
      success: function(data) {
        _this.set('token', data.token);
      },
      dataType: 'json'
    });
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

  addUser: function(user, collection, options) {
    //TODO: refactor code to use render? or nested views.
    if (options.index == 1) {
      this.render();
    }
  },

    render: function() {
      var userView1 = new UserView({model: this.collection.at(0)});
      var userView2 = new UserView({model: this.collection.at(1)});
      this.$el.html('');
      this.$el.append(userView1.render().el);
      this.$el.append("<span class='block'>VS</div>");
      this.$el.append(userView2.render().el);
      return this;
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
