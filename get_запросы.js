const req = require("express/lib/request")
const res = require("express/lib/response")
const { User } = require("./db/models")
const ApiError = require("./apiError")

class Person{
    async get_by_id(req,res,next){
        const id = req.params.id
        const user = await User.findByPk(id)
        if(user){
            res.status(400).json({user})
        }
        else return next(ApiError.badRequest(`Пользователь с id=${id} не найден`))
    }
    async get_by_fio(req,res,next){
        const {surname, name, lastname} = req.query
        const user = await 
    }
}
