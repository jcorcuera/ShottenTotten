var SocketModule;

SocketModule = (function() {

  function SocketModule() {
    this.connect = __bind(this.connect, this);
    this.addHandlers();
  };

  SocketModule.prototype.addHandlers = function() {
    game.events.on('connect-info', this.connect);
  };

  SocketModule.prototype.connect = function(info) {
    this.url = info.socketURL;
    this.id = info.id;
    this.socket = io.connect(this.url)
    this.addSocketHandlers();
  };

  SocketModule.prototype.addSocketHandlers = function() {

  };

  return SocketModule;
})();

new SocketModule();
