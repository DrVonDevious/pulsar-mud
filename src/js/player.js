
const utils = require("../js/utils.js")
const user = require("../js/user.js")
const socket = require("../js/server/socket.js")
const io = require("socket.io-client")
const request = require("superagent")

const player = {

  getCurrentLocation: async () => {
    let locations = await utils.getLocations()
    let currentLocation = locations.find(loc => {
      if (
        loc.x == user.currentCharacter.xpos &&
        loc.y == user.currentCharacter.ypos &&
        loc.z == user.currentCharacter.zpos
      ) { return loc }
    })
    return currentLocation
  },

  updatePlayer: () => {
    request.put(`http://localhost:3000/characters/${user.currentCharacter.id}`)
      .send({
        name: user.currentCharacter.name,
        race: user.currentCharacter.race,
        xpos: user.currentCharacter.xpos,
        ypos: user.currentCharacter.ypos,
        zpos: user.currentCharacter.zpos,
        user_id: user.currentCharacter.user_id,
      })
      .then(res => {
        let playerObject = user.currentCharacter
        socket.currentSocket.emit("player-update", { player:playerObject })
        return res
      })
      .catch(err => {
        console.log(err.message)
        console.log(err.response)
      })

  },

  where: async () => {
    let location = await player.getCurrentLocation()
    utils.printMsg(location.id)
    utils.printMsg(location.name, "#CF0")
    utils.printMsg(location.description)
    utils.printMsg("Exits:")
    utils.printMsg(`x:${user.currentCharacter.xpos}, y:${user.currentCharacter.ypos}, z:${user.currentCharacter.zpos}`)
    for (let exit in location.exits) {
      utils.printMsg(`- ${exit}`)
    }
  },

  go: async (direction) => {
    let location = await player.getCurrentLocation()
    let targetId = location.exits[direction]
    if (targetId) {
      let locations = await utils.getLocations()
      let newLocation = await request.get(`http://localhost:3000/locations/${targetId}`)
        .then(res => { return res.body[0] })
      user.currentCharacter.xpos = newLocation.x
      user.currentCharacter.ypos = newLocation.y
      user.currentCharacter.zpos = newLocation.z
    } else {
      console.log("Couldnt find exit!")
    }

    player.updatePlayer()
    player.where()
  },

  // sends user message to the local chat for players in
  // the current zone to see
  say: (msgs) => {
    let msg = msgs.slice(1).join(" ")
    let username = user.currentCharacter.name
    socket.currentSocket.emit("message", { sender:username, msg:msg })
  }

}

module.exports = player
