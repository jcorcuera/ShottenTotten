var SocketModule;

SocketModule = (function() {

  function SocketModule() {
    this.addHandlers();
  };

  SocketModule.prototype.addHandlers = function() {
    game.events.on('connect-info', this.connect, this);
    game.events.on('credentials-entered', this.registerUser, this);
    game.events.on('move-done', this.moveDone, this);
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

  SocketModule.prototype.moveDone = function(card_info) {
    this.socket.emit('move-done', card_info);
  };

  SocketModule.prototype.addSocketHandlers = function() {
    this.socket.on('users-connected', this.UsersConnected, this);
    this.socket.on('new-user-connected', this.newUserConnected, this);
    this.socket.on('start-game', this.startGame, this);
    this.socket.on('next-turn', this.nextTurn, this);
  };

  SocketModule.prototype.newUserConnected = function(user) {
    game.events.trigger('new-user-connected', user);
  };

  SocketModule.prototype.UsersConnected = function(users) {
    game.events.trigger('users-connected', users);
  };

  SocketModule.prototype.startGame = function() {
    game.init();
    game.events.trigger('start-game', {});
  };

  SocketModule.prototype.nextTurn = function(last_move) {
    game.events.trigger('next-turn', last_move);
  };

  return SocketModule;
})();

new SocketModule();
