const express = require("express")
const { canTreatArrayAsAnd } = require("sequelize/lib/utils")

const app = express()

PORT=8080

app.get('/',(req,res)=>{
    res.status(400).send("hello world")
})
const start = ()=>{
    try{
        app.listen(PORT,()=>console.log(`Server starts on PORT=${PORT}`))
        console.log("Абдималиков Байэл Эрнистович 11ИС-322")
    }
    catch(error){
        console.error('Unable to listen the port',error)
    }
}
start()
