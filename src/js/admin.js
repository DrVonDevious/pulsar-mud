const utils = require("../js/utils.js")
const request = require("superagent")
const user = require("../js/user.js")
const player = require("../js/player.js")


const createLocation = (name, description, exits) => {
  request.post(utils.port + "locations")
    .send({
      name: name,
      description: description,
      x: user.currentCharacter.xpos,
      y: user.currentCharacter.ypos,
      z: user.currentCharacter.zpos,
      exits: exits,
      items: {},
    })
    .then(res => {
      utils.printMsg("Location created!")
      console.log(JSON.stringify(res.body))
    })
    .catch(err => {
      console.log(err.message)
      console.log(err.response)
    })
}

const removeLocation = async (id) => {
  let location = await player.getCurrentLocation()

  request.delete(`${utils.port}locations/${id}`)
    .then(res => {
      console.log(JSON.stringify(res.body))
      utils.printMsg("Location deleted!")
    })
    .catch(err => {
      console.log(err.message)
      console.log(err.response)
    })
}

const updateLocation = async (name, description, exits) => {
  let location = await player.getCurrentLocation()
  console.log(location)
  request.put(`${utils.port}locations/${location.id}`)
    .send({
      name: name,
      description: description,
      x: location.x,
      y: location.y,
      z: location.z,
      exits: exits,
      items: {},
    })
    .then(res => {
      console.log(JSON.stringify(res.body))
      utils.printMsg("Location updated!")
    })
    .catch(err => {
      console.log(err.message)
      console.log(err.response)
    })
}

const admin = {

  newLocation: async () => {
    let name = await utils.query("Enter location name:")
    let description = await utils.query("Enter location description:")
    let exits = await utils.query(`Enter exits in JSON form: {"direction":<location_id>}`)

    createLocation(name, description, exits)
  },

  removeLocation: async () => {
    let location = await player.getCurrentLocation()
    removeLocation(location.id)
  },

  editLocation: async () => {
    let location = await player.getCurrentLocation()
    let response = utils.query("Which property would you like to edit? (name, description, exits)")

    switch(response) {
      case "name":
        utils.printMsg("Enter new name:")
        utils.awaitingResponse = true
        utils.query("", response => updateLocation(response, location.description, location.exits))
        break
      case "desc":
        utils.printMsg("Enter new description:")
        utils.awaitingResponse = true
        utils.query("", response => updateLocation(location.name, response, location.exits))
        break
      case "exits":
        utils.printMsg("Enter new exits:")
        utils.awaitingResponse = true
        utils.query("", response => updateLocation(location.name, location.description, response))
        break
      default:
        utils.printMsg("Invalid input!", "#F00")
        break
    }
  },

  banUser: (user) => {},

  teleport: (x, y, z) => {
    user.currentCharacter.xpos = x
    user.currentCharacter.ypos = y
    user.currentCharacter.zpos = z
  },

}

module.exports = admin
