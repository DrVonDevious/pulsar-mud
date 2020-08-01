
const utils = require("../js/utils.js")

const player = {

  name: "Bob",
  isAdmin: true,
  race: "Human",
  hp: 10,
  x: 0,
  y: 0,
  z: 0,

  tele: (destination) => {
    if (player.isAdmin) {
      utils.printMsg(`Teleporting to ${destination}.`, "gold", "italic")
      player.x = player.y = player.z = 0
    } else {
      utils.printMsg("You do not have permision to use that command!", "#F00")
    }
  },

}

module.exports = player
