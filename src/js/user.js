const request = require("superagent")
const utils = require("../js/utils.js")

const getCharacters = async () => {
  let characters = await request.get("http://localhost:3000/characters")
    .then(res => {
      let characters = res.body.filter(char => {
        return char.user_id === user.id
      })
      return characters
    })
  return characters
}

const user = {

  id: null,
  username: "none",
  role: "none",
  currentCharacter: null,

  newCharacter: async () => {
    utils.printMsg("What is your name?")
    utils.awaitingResponse = true
    await utils.query("", async (response) => {
      let name = response
      utils.printMsg("What is your race? (human, rodan, dakari)")
      utils.awaitingResponse = true
      await utils.query("", (response) => {
        let race = response
        utils.printMsg("Character created!", "orange")
        request.get(`http://localhost:3000/users/${user.id}`)
          .then(res => {
            request.post("http://localhost:3000/characters")
              .send({
                name: name,
                race: race,
                xpos: 0,
                ypos: 0,
                zpos: 0,
                user_id: user.id
              })
              .then(res => {
                console.log(JSON.stringify(res.body))
              })
              .catch(err => {
                console.log(err.message)
                console.log(err.response)
              })
          })
      })
    })
  },

  characters: async () => {
    let characters = await getCharacters()
    characters.forEach(char => {
      utils.printMsg(`Name: ${char.name}, Race: ${char.race}.`)
    })
  },

  playCharacter: async (character) => {
    let characters = await getCharacters()
    let foundCharacter = characters.find(char => {
      return char.name === character
    })
    if (foundCharacter) {
      user.currentCharacter = foundCharacter
      utils.printMsg("Now playing as " + foundCharacter.name, "#AF0")
    } else {
      utils.printMsg("Character not found!", "#F00")
    }
  }

}

module.exports = user
