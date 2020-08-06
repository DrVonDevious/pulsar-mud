
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
  let currentLocation = locations.find(loc => {
    if (
      loc.x == user.currentCharacter.xpos &&
      loc.y == user.currentCharacter.ypos &&
      loc.z == user.currentCharacter.zpos
    ) { return loc }
  })
  return currentLocation
}

const player = {

  where: async () => {
    let location = await getCurrentLocation()
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
    let location = await getCurrentLocation()
    // let targetDirection = Object.keys(location.exits).find(exit => exit == direction)
    let targetId = location.exits[direction]
    if (targetId) {
      let locations = await getLocations()
      let newLocation = await request.get(`http://localhost:3000/locations/${targetId}`)
        .then(res => { return res.body[0] })
      user.currentCharacter.xpos = newLocation.x
      user.currentCharacter.ypos = newLocation.y
      user.currentCharacter.zpos = newLocation.z
    } else {
      console.log("Couldnt find exit!")
    }
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
        console.log(JSON.stringify(res.body))
      })
      .catch(err => {
        console.log(err.message)
        console.log(err.response)
      })
  },

}

module.exports = player
