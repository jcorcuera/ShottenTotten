var SocketModule;

SocketModule = (function() {

  function SocketModule() {
    this.connect = __bind(this.connect, this);
    this.registerUser = __bind(this.registerUser, this);
    this.newUserConnected = __bind(this.newUserConnected, this);

    this.addHandlers();
  };

  SocketModule.prototype.addHandlers = function() {
    game.events.on('connect-info', this.connect);
    game.events.on('credentials-entered', this.registerUser);
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
    this.socket.on('new-user-connected', this.newUserConnected);
  };

  SocketModule.prototype.newUserConnected = function(user) {
    game.events.trigger('new-user-connected', user);
  };

  return SocketModule;
})();

new SocketModule();
