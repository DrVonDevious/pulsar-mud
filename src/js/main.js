const commands = require("../js/commands.js")
const utils = require("../js/utils.js")
const player = require("../js/player.js")
const socket = require("../js/socket.js")
const user = require("../js/user.js")
const request = require("superagent")
const bcrypt = require("bcrypt")
const io = require("socket.io-client")

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
    userLogin()
  })

  quitButton.addEventListener("click", () => {
    require("electron").remote.app.exit(0)
  })
}

const userRegister = () => {
  menu.style.display = "none"
  register.style.display = "block"

  const registerForm = document.querySelector("#register-form")
  const rBackBtn = document.querySelector("#r-back-btn")

  rBackBtn.addEventListener("click", (event) => {
    register.style.display = "none"
    mainMenu()
  })

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    if (
      event.target[0].value.length >= 3
      && event.target[1].value.length >= 8
      && event.target[2].value === event.target[1].value
      && event.target[3].value.length >= 10
    ) {

      let securePassword = await bcrypt.hash(event.target[1].value, 8)
        .then(password => {
          return password
        })

      request.post(utils.port + "users")
      .send({
        username: event.target[0].value,
        password_digest: securePassword,
        email: event.target[3].value,
        role: "basic"
      })
        .then(res => {
          register.style.display = "none"
          mainMenu()
        })
        .catch(err => {
          console.log(err.message)
          console.log(err.response)
        })
    } else {
      alert("Register information is invalid!")
    }
  })
}

const userLogin = () => {
  menu.style.display = "none"
  login.style.display = "block"

  const loginForm = document.querySelector("#login-form")
  const lBackBtn = document.querySelector("#l-back-btn")

  lBackBtn.addEventListener("click", (event) => {
    login.style.display = "none"
    mainMenu()
  })

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    let username = event.target[0].value
    let password = event.target[1].value
    request.get(utils.port + "users")
      .then(async res => {
        let users = res.body
        let foundUser = users.find(user => {
          return user.username === username
        })

        if (foundUser) {

          console.log(foundUser.password_digest)
          console.log("typed: " + password)

          let passwordResult = await bcrypt.compare(password, foundUser.password_digest)
            .then(result => { return result })

          console.log(passwordResult)

          if (passwordResult) {
            login.style.display = "none"
            mainDiv.style.display = "block"
            user.id = foundUser.id
            user.username = username
            user.role = foundUser.role
            socket.connect()
          } else {
            event.target[0].value = ""
            event.target[1].value = ""
            alert("Invalid Password!")
          }
        } else {
          event.target[0].value = ""
          event.target[1].value = ""
          alert("Invalid Username!")
        }
      })
  })
}

const gameScreen = () => {
  menu.style.display = "none"
  mainDiv.style.display = "block"
}

const run = async () => {
  await titleScreen("Pulsar", 2000)
  mainMenu()
}

run()
