import express from 'express'
import cors from 'cors'
import {v4 as uuidv4} from 'uuid'

const app = express()

app.use(express.json())

app.use(cors())

// Setando um banco de dados ficticio

const dbUsers = []

// Setando o middleware

function checkUserExists(req, res, next) {
  const {username} = req.header

  const user = dbUsers.find(user => user.username === username)

  if(!user) {
    return res.status(404).json({error: 'User not found'})
  }

  req.user = user

  return next()
}

// Criando um novo user

app.post("/users", checkUserExists, (req, res, next) => {
  const {name, username} = req.header

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: []
  }

  dbUsers.push(user)

  return res.status(201).json({message: 'User created successfully', user})
})



app.listen(3000, () => {
  console.log('Server is running on port 3000')
})