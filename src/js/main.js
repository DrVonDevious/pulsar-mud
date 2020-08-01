const commands = require("../js/commands.js")
const utils = require("../js/utils.js")
const player = require("../js/player.js")

const mainDiv = document.querySelector("#main-window")
const inputBar = document.querySelector("#input-form")

// processes user input and clears the input bar
inputBar.addEventListener("submit", (event) => {
  event.preventDefault()
  commands.getCmd(event.target[0].value)
  event.target[0].value = ""
})

const titleScreen = (duration) => {
  mainDiv.style.display = "none"
  let title = document.createElement("h1")
  title.innerText = "Pulsar"
  title.id = "title-text"
  document.body.appendChild(title)
  utils.wait(() => {
    document.body.removeChild(title)
    mainDiv.style.display = "block"
  }, duration)
}

const run = () => {
  titleScreen(3000)
}

run()
