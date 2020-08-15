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
      let adminFilter = playerFilter && user.role == "admin"

      // checks if the first word of a command matches a known command
      // User Commands
      if (cmds[0] == "clear" && cmds.length === 1) utils.clearScreen()
      else if (cmds[0] == "help" && cmds.length <= 2) help(cmds)
      else if (cmds[0] == "quit" && cmds.length === 1) quitGame()
      else if (cmds[0] == "logout" && cmds.length === 1) { console.log("NOT IMPLEMENTED YET") }
      else if (cmds[0] == "new" && cmds.length === 1 && !playerFilter) user.newCharacter()
      else if (cmds[0] == "retire" && cmds.length === 2 && !playerFilter) { console.log("NOT IMPLEMENTED YET") }
      else if (cmds[0] == "user" && cmds.length === 1) userInfo()
      else if (cmds[0] == "play" && cmds.length === 2) user.playCharacter(cmds[1])
      else if (cmds[0] == "characters" && cmds.length === 1) user.characters()
      else if (cmds[0] == "sb" && cmds.length === 1) utils.toggleSidebar()

      // Player Commands
      else if (cmds[0] == "say" && cmds.length >= 2 && playerFilter) player.say(cmds)
      else if (cmds[0] == "whisper" && playerFilter) { console.log("NOT IMPLEMENTED YET") }

      else if (cmds[0] == "go" && cmds.length === 2 && playerFilter) player.go(cmds[1])
      else if (cmds[0] == "board" && playerFilter) { console.log("NOT IMPLEMENTED YET") }

      else if (cmds[0] == "where" && cmds.length === 1 && playerFilter) player.where()
      else if (cmds[0] == "look" && playerFilter) { console.log("NOT IMPLEMENTED YET") }
      else if (cmds[0] == "inv" && cmds.length === 1 && playerFilter) { console.log("NOT IMPLEMENTED YET") }
      else if (cmds[0] == "me" && cmds.length === 1 && playerFilter) { console.log("NOT IMPLEMENTED YET") }

      else if (cmds[0] == "grab" && playerFilter) { console.log("NOT IMPLEMENTED YET") }

      // Admin Commands
      else if (cmds[0] == "tele" && cmds.length === 4 && adminFilter) {
        admin.teleport(cmds[1], cmds[2], cmds[3])
      }

      else if (cmds[0] == "createLocation" && cmds.length === 1 && adminFilter) admin.newLocation()
      else if (cmds[0] == "editLocation" && cmds.length === 1 && adminFilter) admin.editLocation()
      else if (cmds[0] == "deleteLocation" && cmds.length === 1 && adminFilter) admin.deleteLocation()

      else unknownCmd()
    }
  },

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

