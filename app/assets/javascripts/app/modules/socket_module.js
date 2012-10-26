var SocketModule;

SocketModule = (function() {

  function SocketModule() {
    this.addHandlers();
  };

  SocketModule.prototype.addHandlers = function() {
    game.events.on('connect-info', this.connect, this);
    game.events.on('credentials-entered', this.registerUser, this);
  };

  SocketModule.prototype.connect = function(info) {
    this.url = info.socketURL;
    this.id = info.id;
    this.socket = io.connect(this.url)
    this.addSocketHandlers();
  };

  SocketModule.prototype.registerUser = function(username) {
    this.socket.emit('register-user', {
      id: this.id,
      username: username
    })
  };

  SocketModule.prototype.addSocketHandlers = function() {
    this.socket.on('users-connected', this.UsersConnected, this);
    this.socket.on('new-user-connected', this.newUserConnected, this);
    this.socket.on('start-game', this.startGame, this);
  };

  SocketModule.prototype.newUserConnected = function(user) {
    game.events.trigger('new-user-connected', user);
  };

  SocketModule.prototype.UsersConnected = function(users) {
    game.events.trigger('users-connected', users);
  };

  SocketModule.prototype.startGame = function() {
    game.init();
  };

  return SocketModule;
})();

new SocketModule();
