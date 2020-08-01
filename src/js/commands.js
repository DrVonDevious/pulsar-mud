const remote = require("electron").remote
const utils = require("../js/utils.js")
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
        case "create": create(); break
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
  let win = remote.getCurrentWindow()
  remote.app.exit(0)
}

const create = async () => {
  // the current query function is super messy and NEEDS to be rewritten!
  utils.printMsg("What is your name?", "green")
  utils.awaitingResponse = true
  utils.query("Test?", (response) => {
    utils.printMsg(`Ah, so your name is ${response}!`, "gold")
    player.name = response
    console.log(player.name)
  })
}

// outputs an error message when an unknown input is entered
const unknownCmd = () => {
  utils.printMsg("That is not a valid command", "#F00")
}

module.exports = commands

