const express = require("express")
const app = express()

const sequelize = require("./db/db_connect.js")
const models = require("./db/models.js")

PORT=8080

app.get('/',(req,res)=>{
    res.status(400).send("hello world")
})
const router = require('./routes/index.js')
app.use('/query',router)

const start = async()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,()=>console.log(`Server starts on PORT=${PORT}`))
        console.log("Абдималиков Байэл Эрнистович 11ИС-322")
    }
    catch(error){
        console.error('Unable to listen the port',error)
    }
}
start()
