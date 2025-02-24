const {Sequelize} = require("sequelize")
require("dotenv").config({path:'./env'})

module.exports = new Sequelize ( //parameters order matter
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: "postgres",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    }
)