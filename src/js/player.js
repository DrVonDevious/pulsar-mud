
const utils = require("../js/utils.js")
const user = require("../js/user.js")
const request = require("superagent")

const getLocations = async () => {
  let locations = await request.get("http://localhost:3000/locations")
    .then(res => {
      return res.body
    })
  return locations
}

const getCurrentLocation = async () => {
  let locations = await getLocations()
  let currentLocation = locations.map(loc => {
    if (
      loc.x == user.currentCharacter.xpos &&
      loc.y == user.currentCharacter.ypos &&
      loc.z == user.currentCharacter.zpos
    ) { return loc }
  })[0]
  return currentLocation
}

const player = {

  where: async () => {
    let location = await getCurrentLocation()
    utils.printMsg(location.name, "#CF0")
    utils.printMsg(location.description)
  },

}

module.exports = player
