const weapons = require("./weapons.js")
const wearables = require("./wearables.js")
// const consumables = require("./consumables.js")

module.exports = {

  getItemById: (id) => {
    const allItems = { ...weapons, ...wearables }
    let foundItem = {}
    Object.keys(allItems).map((key, index) => {
      if (id === allItems[key].id) { foundItem = allItems[key] }
    })
    return foundItem
  },

  weapons,
  wearables,
  // consumables

}
