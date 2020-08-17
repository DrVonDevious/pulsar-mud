const weapons = require("./weapons.js")
const wearables = require("./wearables.js")
// const consumables = require("./consumables.js")

const items = {

  all: {
    ...weapons,
    ...wearables,
  },

  getItemById: (id) => {
    let foundItem = {}
    Object.keys(items.all).map((key, index) => {
      if (id === items.all[key].id) { foundItem = items.all[key] }
    })
    return foundItem
  },

  getItemByName: (name) => {
    let foundItem = null
    Object.keys(items.all).map((key, index) => {
      if (name === items.all[key].name) { foundItem = items.all[key] }
    })
    return foundItem
  },

  weapons,
  wearables,
  // consumables

}

module.exports = items
