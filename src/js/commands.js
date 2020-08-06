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
      // checks if the first word of a command matches a known command
      switch(cmds[0]) {
        case "clear": utils.clearScreen(); break
        case "quit": quitGame(cmds); break
        case "say": sendLocalMsg(cmds); break
        case "new": user.newCharacter(); break
        case "user": userInfo(); break
        case "play": user.playCharacter(cmds[1]); break
        case "characters": user.characters(); break
        case "where": player.where(); break
        case "go": player.go(cmds[1]); break
        case "tele": admin.teleport(cmds[1], cmds[2], cmds[3]); break
        case "createLocation": admin.newLocation(); break
        default: unknownCmd(); break
      }
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

const userInfo = () => {
  utils.printMsg(`Username: ${user.username}`)
}

// outputs an error message when an unknown input is entered
const unknownCmd = () => {
  utils.printMsg("That is not a valid command", "#F00")
}

module.exports = commands

