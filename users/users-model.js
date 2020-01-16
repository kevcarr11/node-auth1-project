const db = require('../data/dbConfig')

async function add(user) {
 const [id] = await db('users')
  .insert(user)

  return findById(id)
}

function find() {
  return db("users")
    .select("id", "username")
}

function findBy() {
  return db('users')
    .where(filter)
    .select("id", "username", "password")
}

function findById() {
  return db("users")
  .where({ id })
  .first("id", "username")
}


module.exports = {
  add,
  find,
  findBy,
  findById,
}