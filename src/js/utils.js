
const terminal = document.querySelector("#terminal-output")

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

  wait: (callback, ms) => {
    require("electron").remote.getGlobal("setTimeout")(callback, ms)
  },

  awaitingResponse: false,
  response: "",

  checkResponse: () => {
    if (utils.awaitingResponse) {
    }
  },

  query: (question, callback) => {
    if (utils.awaitingResponse) {
      utils.wait(() => {utils.query(question, callback)}, 100)
    } else {
      callback(r = utils.response)
    }
  },

}

module.exports = utils
