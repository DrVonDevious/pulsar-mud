const Pool = require('pg').Pool
const pool = new Pool({
  user: 'william',
  host: 'localhost',
  database: 'pulsar',
  password: 'Prometheus@21',
  port: 5432,
})

// USERS
const getUsers = (request, response) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) { throw error }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) { throw error }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { username, email, password, role } = request.body

  pool.query(
    "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)",
    [username, email, password, role], (error, result) => {
      if (error) { throw error }
      response.status(201).send(`User added with ID: ${result.insertId}`)
    }
  )
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { username, email, password, role } = request.body

  pool.query(
    "UPDATE users SET username = $1, email = $2, password = $3, role = $4 WHERE id = $5",
    [username, email, password, role, id],
    (error, results) => {
      if (error) { throw error }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) { throw error }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

// CHARACTERS
const getCharacters = (request, response) => {
  pool.query("SELECT * FROM characters", (error, results) => {
    if (error) { throw error }
    response.status(200).json(results.rows)
  })
}

const getCharacterById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query("SELECT * FROM characters WHERE id = $1", [id], (error, results) => {
    if (error) { throw error }
    response.status(200).json(results.rows)
  })
}

const createCharacter = (request, response) => {
  const { name, race, xpos, ypos, zpos, user_id } = request.body

  pool.query(
    "INSERT INTO characters (name, race, xpos, ypos, zpos, user_id) VALUES ($1, $2, $3, $4, $5, $6)",
    [name, race, xpos, ypos, zpos, user_id], (error, result) => {
      if (error) { throw error }
      response.status(201).send(`Character created with ID: ${result.insertId}`)
    }
  )
}

const updateCharacter = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, race, xpos, ypos, zpos, user_id } = request.body

  pool.query(
    "UPDATE characters SET name = $1, race = $2, xpos = $3, ypos = $4, zpos = $5, user_id = $6 WHERE id = $7",
    [name, race, xpos, ypos, zpos, user_id, id],
    (error, results) => {
      if (error) { throw error }
      response.status(200).send(`Character modified with ID: ${id}`)
    }
  )
}

// LOCATIONS
const getLocations = (request, response) => {
  pool.query("SELECT * FROM locations", (error, results) => {
    if (error) { throw error }
    response.status(200).json(results.rows)
  })
}

const getLocationById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query("SELECT * FROM locations WHERE id = $1", [id], (error, results) => {
    if (error) { throw error }
    response.status(200).json(results.rows)
  })
}

const createLocation = (request, response) => {
  const { name, description, x, y, z, exits } = request.body

  pool.query(
    "INSERT INTO locations (name, description, x, y, z, exits) VALUES ($1, $2, $3, $4, $5, $6)",
    [name, description, x, y, z, exits], (error, result) => {
      if (error) { throw error }
      response.status(201).send(`Location created with ID: ${result.insertId}`)
    }
  )
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getCharacters,
  getCharacterById,
  updateCharacter,
  createCharacter,
  getLocations,
  getLocationById,
  createLocation,
}
