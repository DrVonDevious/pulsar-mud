const express = require("express")
const bodyParser = require("body-parser")
const db = require("../js/db.js")

const app = express()
const port = 3000

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get("/users", db.getUsers)
app.get("/users/:id", db.getUserById)
app.post("/users", db.createUser)
app.put("/users/:id", db.updateUser)
app.delete("/users/:id", db.deleteUser)

app.get("/characters", db.getCharacters)
app.get("/characters/:id", db.getCharacterById)
app.post("/characters", db.createCharacter)
app.put("/characters/:id", db.updateCharacter)

app.get("/locations", db.getLocations)
app.get("/locations/:id", db.getLocationById)
app.post("/locations", db.createLocation)
app.put("/locations/:id", db.updateLocation)
app.delete("/locations/:id", db.deleteLocation)

app.listen(port, () => {
  console.log(`All systems nominal! Pulsar server running on port ${port}.`)
})
