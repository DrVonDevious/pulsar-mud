const io = require("socket.io-client")
const utils = require("../utils.js")

const socket = {

  currentSocket: null,

  connect: async () => {

    socket.currentSocket = await io.connect("http://localhost:3000")

    socket.currentSocket.on("message", (data) => {
      utils.printMsg(`${data.sender}: ${data.msg}`, "#0AF")
    })
  },

}

module.exports = socket
