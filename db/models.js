const sequelize = require("./db_connect")
const {DataTypes,Op} = require("sequelize")

const User = sequelize.define('user',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    surname:{type:DataTypes.STRING}, allowNull:false,
    name:{type:DataTypes.STRING,allowNull:false},
    lastname:{type:DataTypes.STRING},
    passport_serial:{type:DataTypes.INTEGER},
    passport_number:{type:DataTypes.INTEGER},
    birthday:{type:DataTypes.DATEONLY},
    birthplace:{type:DataTypes.STRING},
    phone:{type:DataTypes.STRING},
    email:{type:DataTypes.STRING},
    registr_at:{type:DataTypes.STRING},
    lives_now:{type:DataTypes.STRING},
    tg:{type:DataTypes.STRING},
    vk:{type:DataTypes.STRING},
})
module.exports = {User}