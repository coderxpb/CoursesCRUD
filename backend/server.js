import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'

const source = process.env.ATLAS_CONNECTION

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(source, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const connection = mongoose.connection
connection.once('open', () => {
  console.log("DB connected.");
})

connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


