const remote = require("electron").remote
const utils = require("../js/utils.js")
const admin = require("../js/admin.js")
const user = require("../js/user.js")
const player = require("../js/player.js")

const output = document.querySelector("#terminal-output")

// To create new user commands add it to the switch case and call its function
const commands = {

  // parses the users input
  getCmd: (cmd = "") => {


    // splits user input into "words"
    let cmds = cmd.split(" ")

    if (utils.awaitingResponse) {
      utils.response = cmd
      utils.awaitingResponse = false
    } else {

      let playerFilter = !!user.currentCharacter
      let adminFilter = user.currentCharacter && user.role == "admin"

      // checks if the first word of a command matches a known command
      // User Commands
      if (cmds[0] == "clear") utils.clearScreen()
      else if (cmds[0] == "help") help(cmds)
      else if (cmds[0] == "quit") quitGame()
      else if (cmds[0] == "new") user.newCharacter()
      else if (cmds[0] == "user") userInfo()
      else if (cmds[0] == "play") user.playCharacter(cmds[1])
      else if (cmds[0] == "characters") user.characters()

      // Player Commands
      else if (cmds[0] == "say" && playerFilter) sendLocalMsg(cmds)
      else if (cmds[0] == "go" && playerFilter) player.go(cmds[1])
      else if (cmds[0] == "where" && playerFilter) player.where()

      // Admin Commands
      else if (cmds[0] == "tele" && adminFilter) {
        admin.teleport(cmds[1], cmds[2], cmds[3])
      }

      else if (cmds[0] == "createLocation" && adminFilter) admin.newLocation()
      else if (cmds[0] == "editLocation" && adminFilter) admin.editLocation()
      else if (cmds[0] == "deleteLocation" && adminFilter) admin.deleteLocation()

      else unknownCmd()
    }
  },

}

// sends user message to the local chat for players in
// the current zone to see
const sendLocalMsg = (msgs) => {
  let msg = msgs.slice(1).join(" ")
  utils.printMsg(`${player.name} says: ${msg}`, "#0FF")
}

// closes all windows and quits the application
const quitGame = (cmds) => {
  // let win = remote.getCurrentWindow()
  remote.app.exit(0)
}

const help = (cmds) => {
  utils.printMsg("A list of commands ->", "#0F0")
  utils.printMsg("\tUser commands:")
  utils.printMsg("\t\tplay <character name> - begin playing as the specified character.")
  utils.printMsg("\t\tnew - create a new character.")
  utils.printMsg("\t\tclear - clears the terminal of messages.")
  utils.printMsg("\t\tquit - quits the game.")
  utils.printMsg("\t\tuser - displays information about your user.")
  utils.printMsg("\t\tcharacters - displays a list of your existing characters.")
  utils.printMsg("\n")
  utils.printMsg("\tPlayer commands:")
  utils.printMsg("\t\tsay - sends a message for all players in the current area to see.")
  utils.printMsg("\t\twhere - displays information about your current location.")
  utils.printMsg("\t\tgo <direction> - moves in a given direction from your current locations list of exits.")
  utils.printMsg("\n")
}

const userInfo = () => {
  utils.printMsg(`Username: ${user.username}`)
}

// outputs an error message when an unknown input is entered
const unknownCmd = () => {
  utils.printMsg("That is not a valid command", "#F00")
}

module.exports = commands

