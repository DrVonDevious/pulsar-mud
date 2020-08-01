const commands = require("../js/commands.js")
const utils = require("../js/utils.js")

const inputBar = document.querySelector("#input-form")

// processes user input and clears the input bar
inputBar.addEventListener("submit", (event) => {
  event.preventDefault()
  commands.getCmd(event.target[0].value)
  utils.awaitingResponse ? utils.awaitingResponse = false : null
  event.target[0].value = ""
})
