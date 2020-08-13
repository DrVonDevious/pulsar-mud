const io = require("socket.io-client")
const utils = require("./utils.js")

const socket = {

  currentSocket: null,

  connect: async () => {

    socket.currentSocket = await io.connect("https://pulsar-backend.herokuapp.com/")

    socket.currentSocket.on("message", (data) => {
      utils.printMsg(`${data.sender}: ${data.msg}`, "#0AF")
    })

    socket.currentSocket.on("player-update", (data) => {
      utils.printMsg(data.player.name + " moved.")
    })
  },

}

module.exports = socket
