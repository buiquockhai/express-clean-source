const socket = require("socket.io");

class SocketIO {
  _io = null;

  setIO(server) {
    this._io = socket(server, {
      cors: {
        origin: "*",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    });
  }

  getIO() {
    return this._io;
  }
}

const socketInstance = new SocketIO();

module.exports = {
  socketInstance,
};

// let _io;

// const setIO = (server) => socket(server);

// const getIO = () => _io;

// module.exports = {
//   setIO,
//   getIO,
// };
