
const terminal = document.querySelector("#terminal-output")
const setTimeout = require("electron").remote.getGlobal("setTimeout")
const request = require("superagent")

const utils = {

  port: "https://pulsar-backend.herokuapp.com/",

  waitFor: (condition) => {
    const poll = resolve => {
      if(condition()) resolve();
      else setTimeout(_ => poll(resolve), 500);
    }

    return new Promise(poll);
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
