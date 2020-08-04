const commands = require("../js/commands.js")
const utils = require("../js/utils.js")
const player = require("../js/player.js")
const user = require("../js/user.js")
const request = require("superagent")

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
    // gameScreen()
  })

  quitButton.addEventListener("click", () => {
    require("electron").remote.app.exit(0)
  })
}

const userRegister = () => {
  menu.style.display = "none"
  register.style.display = "block"

  const registerForm = document.querySelector("#register-form")
  console.log(registerForm)
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault()
    if (
      event.target[0].value.length >= 3
      && event.target[1].value.length >= 8
      && event.target[2].value === event.target[1].value
      && event.target[3].value.length >= 10
    ) {
      request.post("http://localhost:3000/users")
      .send({
        username: event.target[0].value,
        password: event.target[1].value,
        email: event.target[3].value,
        role: "basic"
      })
        .then(res => {
          console.log(JSON.stringify(res.body))
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
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let username = event.target[0].value
    let password = event.target[1].value
    request.get("http://localhost:3000/users")
      .then(res => {
        let users = res.body
        let foundUser = users.find(user => {
          return user.username === username
        })
        if (foundUser && foundUser.password === password) {
          login.style.display = "none"
          mainDiv.style.display = "block"
          user.id = foundUser.id
          user.username = username
          user.role = foundUser.role
        } else {
          event.target[0].value = ""
          event.target[1].value = ""
          alert("Invalid login!")
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
