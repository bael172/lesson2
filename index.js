const express = require("express")

const app = express()

const cors = require("cors")
require("dotenv").config({path:'./db/.env'})
app.use(cors())

const sequelize = require("./db/db_connect.js")
const models = require("./db/models.js")
const router = require("./routes/index.js")

PORT=8080

app.use('/query',router)

app.get('/',(req,res)=>{
    res.status(400).send("hello world")
})
const start = async()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        console.log('Connection to the database established successfully')
        app.listen(PORT,()=>{console.log(`Server starts on PORT=${PORT}`)})
    }
    catch(error){
        console.error('Unable to connect to the database', error)
    }
}
start()
