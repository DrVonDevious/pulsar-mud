
const terminal = document.querySelector("#terminal-output")
const setTimeout = require("electron").remote.getGlobal("setTimeout")
const request = require("superagent")

const utils = {

  port: "https://pulsar-backend.herokuapp.com/",

  updateSidebar: async (character) => {
    const nameLabel = document.querySelector("#sidebar-name")
    const locationNameLabel = document.querySelector("#sidebar-location-name")
    const locationCoordsLabel = document.querySelector("#sidebar-location-coords")

    nameLabel.innerText = character.name
    const location = await utils.getLocationByCoords(character.xpos, character.ypos, character.zpos)
    locationNameLabel.innerText = location.name
    locationCoordsLabel.innerText = `X: ${character.xpos}, Y: ${character.ypos}, Z: ${character.zpos}`
  },

  toggleSidebar: () => {
    const sidebar = document.querySelector("#sidebar")

    if (sidebar.style.display == "block") {
      sidebar.style.display = "none"
    } else {
      sidebar.style.display = "block"
    }
  },

  waitFor: (condition) => {
    const poll = resolve => {
      if(condition()) resolve();
      else setTimeout(_ => poll(resolve), 500);
    }

    return new Promise(poll);
  },

  getLocationByCoords: async (x, y, z) => {
    let locations = await utils.getLocations()
    let currentLocation = locations.find(loc => {
      if (
        loc.x == x && loc.y == y && loc.z == z
      ) { return loc }
    })
    return currentLocation
  },

  getLocations: async () => {
    let locations = await request.get(utils.port + "locations")
      .then(res => {
        return res.body
      })
    return locations
  },


  printMsg: (msg, color="#FFF", background="rgba(0,0,0,0)", style="normal") => {
    let message_element = document.createElement("pre")
    message_element.id = "terminal-msg"
    message_element.innerText = msg
    message_element.style.color = color
    message_element.style.backgroundColor = background
    message_element.style.fontStyle = style
    terminal.appendChild(message_element)
  },

  printImg: () => {},

  clearScreen: () => {
    terminal.innerHTML = ""
  },

  wait: ms => new Promise((r, j)=>setTimeout(r, ms)),

  setTimeout: (callback, ms) => {
    setTimeout(callback, ms)
  },

  awaitingResponse: false,
  response: "",

  query: async (question) => {

    utils.printMsg(question)

    utils.awaitingResponse = true
    await utils.waitFor(_ => !utils.awaitingResponse)
    return utils.response

  },

}

module.exports = utils
