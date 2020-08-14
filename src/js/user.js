const request = require("superagent")
const utils = require("../js/utils.js")


const getCharacters = async () => {
  let characters = await request.get(utils.port + "characters")
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
  characterLocation: null,

  newCharacter: async () => {

    let name = await utils.query("What is your name?")
    let race = await utils.query("What is your race? (human)")

    request.get(`${utils.port}users/${user.id}`)
      .then(res => {
        request.post(utils.port + "characters")
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
            utils.printMsg("Character created!", "#0F0")
          })
          .catch(err => {
            console.log(err.message)
            console.log(err.response)
          })
      })
  },

  retireCharacter: async () => {
    //TODO: deletes character
  },

  logout: () => {
    //TODO
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
      user.characterLocation = await utils.getLocationByCoords(
        foundCharacter.xpos,
        foundCharacter.ypos,
        foundCharacter.zpos
      )
      utils.printMsg("Now playing as " + foundCharacter.name, "#AF0")
    } else {
      utils.printMsg("Character not found!", "#F00")
    }
  }

}

module.exports = user
