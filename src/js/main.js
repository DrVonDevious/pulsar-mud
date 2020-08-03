const commands = require("../js/commands.js")
const utils = require("../js/utils.js")
const player = require("../js/player.js")

const mainDiv = document.querySelector("#main-window")
const menu = document.querySelector("#main-menu")
const inputBar = document.querySelector("#input-form")
const register = document.querySelector("#register-window")
const login = document.querySelector("#login-window")

// processes user input and clears the input bar
inputBar.addEventListener("submit", (event) => {
  event.preventDefault()
  commands.getCmd(event.target[0].value)
  event.target[0].value = ""
})

const titleScreen = async (string, duration) => {
  let title = document.createElement("h1")
  title.innerText = string
  title.id = "title-text"
  document.body.appendChild(title)
  await utils.wait(duration)
  document.body.removeChild(title)
}

const mainMenu = () => {
  const newButton = document.querySelector("#new")
  const loginButton = document.querySelector("#login")
  const quitButton = document.querySelector("#quit")
  menu.style.display = "block"

  newButton.addEventListener("click", () => {
    userRegister()
  })

  loginButton.addEventListener("click", () => {
    gameScreen()
  })

  quitButton.addEventListener("click", () => {
    require("electron").remote.app.exit(0)
  })
}

const userRegister = () => {
  menu.style.display = "none"
  register.style.display = "block"
}

const userLogin = () => {}

const gameScreen = () => {
  menu.style.display = "none"
  mainDiv.style.display = "block"
}

const run = async () => {
  await titleScreen("Pulsar", 2000)
  mainMenu()
}

run()
