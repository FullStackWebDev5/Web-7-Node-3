const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

const User = mongoose.model('User', { //users
  firstName: String,
  lastName: String,
  phone: Number
})

app.get('/', (req, res) => {
  res.json({
    message: 'All good!'
  })
})

/*
  Schema:
    - Mongoose method: .model()
  USERS:
  - READ: GET /users
    - Mongoose method: .find()
  - CREATE: POST /users
    - Mongoose method: .create()
  - UPDATE: PATCH /users/:id
    - Mongoose method: .findByIdAndUpdate()
  - DELETE: DELETE /users/:id
    - Mongoose method: .findByIdAndDelete()
*/

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.json({
      status: 'SUCCESS',
      data: users
    })
  } catch (error) {
    res.json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
})

app.post('/users', async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body
    await User.create({ firstName, lastName, phone })
    res.json({
      status: 'SUCCESS',
      message: 'User created successfully'
    })
  } catch (error) {
    res.json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
})


app.patch('/users/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { firstName, lastName, phone } = req.body
    await User.findByIdAndUpdate(id, { firstName, lastName, phone })
    res.json({
      status: 'SUCCESS',
      message: 'User updated successfully'
    })
  } catch (error) {
    res.json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
})

app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params
    await User.findByIdAndDelete(id)
    res.json({
      status: 'SUCCESS',
      message: 'User deleted successfully'
    })
  } catch (error) {
    res.json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
})


app.listen(process.env.PORT, () => {
  mongoose.connect(process.env.MONGODB_URL)
    .then(() =>  console.log(`Server running on http://localhost:${process.env.PORT}`))
    .catch((error) => console.log(error))
})




































/*
  -------------------------------------------
    MERN: 
    - M: MongoDB
    - E: Express
    - R: React.js
    - N: Node.js

    DB: Database (Permanent Storage)
    - Relational (SQL) 
        - Tables & Rows
        - This is used when the structure/schema is clear
        - Eg: MySQL, PostgreSQL, etc
    - Non-Relational (No-SQL) 
        - Collections & Documents
        - This is used when the structure/schema is unclear
        - Eg: MongoDB, AWS DynamoDB

    Driver:
    - Mongoose: ODM (Object Data Modeling) for MongoDB

    Example for a Mongoose Schema:
    - User
      - firstName: String
      - lastName: String
      - email: String
      - phoneNumber: Number
*/


/*
  ## HTTP Methods: (REST APIs - CRUD operations)
  - GET (READ - R)
  - POST (CREATE - C)
  - PUT/PATCH (UPDATE - U)
  - DELETE (DELETE -D)

  Example:
  1. Student information website
  Model- 
  Student:
  - firstName: String
  - lastName: String
  - email: String
  - rollNo: Number
  CRUD -
  1. List all students: GET /students (READ)
  2. Create a new student: POST /students (CREATE)
  3. Update student information: PATCH /students/:id (UPDATE)
  4. Delete student information: DELETE /students/:id (DELETE)

  2. E-Commerce website
  Models-
  1. Product
  - name: String
  - imgURL: String
  - price: Number
  - discount: Number
  2. Customer
  - firstName: String
  - lastName: String
  - gender: String
  - phone: Number
  - email: String
  3. Sellers
  - businessName: String
  - gstDetails: String

  CRUD -
  1. Product
  - R: GET /products
  - C: POST /products
  - U: PATCH /products/:id
  - D: DELETE /products/:id
  2. Customer
  - R: GET /customers
  - C: POST /customers
  - U: PATCH /customers/:id
  - D: DELETE /customers/:id
  3. Sellers
  - R: GET /sellers
  - C: POST /sellers
  - U: PATCH /sellers/:id
  - D: DELETE /sellers/:id
*/
