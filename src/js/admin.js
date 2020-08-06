const utils = require("../js/utils.js")
const request = require("superagent")
const user = require("../js/user.js")
const player = require("../js/player.js")

const createLocation = (name, description, exits) => {
  request.post("http://localhost:3000/locations")
    .send({
      name: name,
      description: description,
      x: user.currentCharacter.xpos,
      y: user.currentCharacter.ypos,
      z: user.currentCharacter.zpos,
      exits: exits
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

const admin = {

  newLocation: () => {
    utils.printMsg("Enter location name:")
    utils.awaitingResponse = true
    utils.query("", (response) => {
      let name = response
      utils.printMsg("Enter location description:")
      utils.awaitingResponse = true
      utils.query("", (response) => {
        let description = response
        utils.printMsg("Enter exits in JSON form: {'direction':'Location ID'}")
        utils.awaitingResponse = true
        utils.query("", (response => {
          console.log(response)
          console.log(JSON.parse(response))
          let exits = response//JSON.parse(response)
          createLocation(name, description, exits)
        }))
      })
    })
  },

  editLocation: () => {},

  banUser: (user) => {},

  teleport: (x, y, z) => {
    user.currentCharacter.xpos = x
    user.currentCharacter.ypos = y
    user.currentCharacter.zpos = z
  },

}

module.exports = admin
