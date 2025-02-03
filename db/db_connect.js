const {Sequelize} = require("sequelize")
require("dotenv").config({path:'./env'})

module.exports = new Sequelize (
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    process.env.DB_NAME,
    {
        dialect:"postgres",
        host:process.env.DB_HOST,
        port:process.env.DB_PORT,
    }
)