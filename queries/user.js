const apiError = require("../apiError.js")
const {User} = require("../db/models.js")
const {Op} = require("sequelize")

const jwt = require("jsonwebtoken")
const ApiError = require("../apiError.js")

function generate_token(id, passport_serial, passport_number, birthplace, surname, name, phone, email, registr_at, lives_now){
    return jwt.sign(
        (id, passport_serial, passport_number, birthplace, birthday, surname, name, phone, email, registr_at, lives_now),
        process.env.SECRET_KEY,
        {expiresIn:'24h'}
    )
}

class Person {
    async add(req,res,next){
        const {passport_serial, passport_number, birthday, birthplace, surname, name, lastname, phone, email, tg, vk, registr_at, lives_now} = req.body
        if(!surname && !name){
            res.send("Введите имя и фамилию")
        }
        try{
            const candidate = await User.findOne({where:{
                [Op.or]:[{[Op.and]:[{passport_serial},{passport_number}]},
                        {[Op.and]:[{surname},{name},{phone},]},
                        {tg},
                        {vk}]
            }})
        }
        catch(e){
            return next(ApiError.internal('Ошибка поиска кандидата',e))
        }

        if(!candidate){
            try{
                const new_user = await User.create({passport_serial,passport_number, birthday, birthplace, surname, name, lastname, phone, email, tg, vk, registr_at, lives_now})
                const token = generate_token(new_user.passport_serial,new_user.passport_number, new_user.birthday, new_user.birthday_place, 
                                             new_user.surname, new_user.name, lastname, phone, email, tg, vk, registr_at, lives_now)
                return res.status(200).json({token})
            }
            catch(e){
                return next(ApiError.internal('Ошибка создания пользователя'))
            }

        }
        else return next(ApiError.badRequest("Пользователь с такими данными уже в системе"))
    }
    async destroy(req,res,next){
        const id = req.params.id;
        try{
            const candidate = await User.findByPk(id);
            if(candidate){
                await User.destroy({where:{id}}).then(response=>res.json(response))
            }
            else  return next(ApiError.badRequest('Пользователь с id=',id,' не существует'))
        }
        catch(e){
            return next(ApiError.internal(e,'Ошибка удаления пользователя'))
        }
    }
}

module.exports = new Person()