
const utils = require("../js/utils.js")
const user = require("../js/user.js")
const items = require("../../lib/items/items.js")
const socket = require("../js/socket.js")
const io = require("socket.io-client")
const request = require("superagent")


const player = {

  getCurrentLocation: async () => {
    let x = user.currentCharacter.xpos
    let y = user.currentCharacter.ypos
    let z = user.currentCharacter.zpos

    let currentLocation = await utils.getLocationByCoords(x, y, z)

    player.currentLocation = currentLocation
    return currentLocation
  },

  updatePlayer: () => {
    request.put(`${utils.port}characters/${user.currentCharacter.id}`)
      .send({
        name: user.currentCharacter.name,
        race: user.currentCharacter.race,
        xpos: user.currentCharacter.xpos,
        ypos: user.currentCharacter.ypos,
        zpos: user.currentCharacter.zpos,
        inventory: user.currentCharacter.inventory,
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
      let newLocation = await request.get(`${utils.port}locations/${targetId}`)
        .then(res => { return res.body[0] })

      if (newLocation) {
        console.log(newLocation)
        user.currentCharacter.xpos = newLocation.x
        user.currentCharacter.ypos = newLocation.y
        user.currentCharacter.zpos = newLocation.z
        player.currentLocation = newLocation
        utils.updateSidebar(user.currentCharacter)
      } else { utils.printMsg("You can't go that way!", "#F00") }

    } else {
      console.log("Couldnt find exit!")
    }

    player.updatePlayer()
    player.where()
  },

  // sends user message to the local chat for players in
  // the current zone to see
  say: (msgs) => {
    console.log(msgs)
    let msg = msgs.slice(1).join(" ")
    let username = user.currentCharacter.name
    socket.currentSocket.emit("message", { sender:username, msg:msg })
  },

  showInventory: () => {
    if (user.currentCharacter.inventory) {
      user.currentCharacter.inventory.map(item => {
        const foundItem = items.getItemById(item.id)
        utils.printMsg(foundItem.name, "#FA0")
      })
    } else {
      utils.printMsg("Your inventory is empty")
    }
  },

  grab: (target) => {
    if (!user.currentCharacter.inventory) {
      user.currentCharacter.inventory = []
    }

    if (target) {
      let foundItem = items.getItemByName(target)
      console.log(target)
      if (foundItem) {
        user.currentCharacter.inventory.push({ id:foundItem.id, qty:1 })
        Object.keys(foundItem).map((k, i) => {
          console.log(k)
        })
      } else {
        utils.printMsg("You do not see that item here.")
      }
    } else {
      if (user.characterLocation.items) {
        let item = user.characterLocation.items[0]
        if (item) {
          console.log(item)
          user.currentCharacter.inventory.push(item)
        } else {
          utils.printMsg("You see no items here to pick up.")
        }
      } else {
        utils.printMsg("You see no items here to pick up.")
      }
    }
  },

}

module.exports = player
