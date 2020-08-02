
const terminal = document.querySelector("#terminal-output")
const setTimeout = require("electron").remote.getGlobal("setTimeout")

const utils = {

  printMsg: (msg, color="#FFF", background="rgba(0,0,0,0)", style="normal") => {
    let message_element = document.createElement("p")
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

  // wait: (ms) => {
  //   new Promise((r) => {
  //     require("electron").remote.getGlobal("setTimeout")(r, ms)
  //   })
  // },

  setTimeout: (callback, ms) => {
    setTimeout(callback, ms)
  },

  awaitingResponse: false,
  response: "",

  checkResponse: () => {
    if (utils.awaitingResponse) {
    }
  },

  query: (question, callback) => {
    if (utils.awaitingResponse) {
      utils.timeout(() => {utils.query(question, callback)}, 100)
    } else {
      callback(r = utils.response)
    }
  },

}

module.exports = utils
