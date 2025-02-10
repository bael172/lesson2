const { User } = require("../db/models")
const ApiError = require("../apiError")
const {Op} = require("sequelize")

class GetPerson{
    async get_by_id(req,res,next){
        const id = req.params.id
        if(!id){
            return next(ApiError.badRequest("Введите id"))
        }
        try{
            const user = await User.findByPk(id)
            if(user) res.status(400).json({user})
            else return next(ApiError.badRequest(`Пользователь с id=${id} не найден`))
        }
        catch(error){
            if(error instanceof ApiError){
                res.status(error.status).json({error:error.message})
            }
            else{
                console.error("Произошла ошибка",error)
                return next(ApiError.internal("Внутренняя ошибка сервера"))
            }
        }

    }
    async get_by_fio_AND(req,res,next){
        const {surname, name, lastname} = req.query
        if(!surname || !name || !lastname){
            return next(ApiError.badRequest(`Введите необходимые параметры surname, name, lastname`))
        }
        try{
            const user = await User.findAll({where:{
                surname,name,lastname
            }})
            if(user) res.status(200).json(user)
            else res.status(404).send(`Пользователь с таким ФИО не найден`)
        }
        catch(error){
            if(error instanceof ApiError){
                res.status(error.status).json({error:error.message})
            }
            else{
                console.error("Произошла ошибка",error)
                return next(ApiError.internal("Внутренняя ошибка сервера"))
            }
        }
    }
    async get_by_fio_OR(req,res,next){
        const {surname, name, lastname} = req.query
        try{
            const user = await User.findAll({where:{
                [Op.or]:[
                    {surname},{name},{lastname}
                ]
            }})
            if(user) res.status(200).json({user})
            else res.status(404).send(`Пользователь с Фамилией=${surname}, Именем=${name} Отчеством=${lastname} не найден`)
        }
        catch(error){
            if(error instanceof ApiError){
                res.status(error.status).json({error:error.message})
            }
            else{
                console.error("Произошла ошибка",error)
                return next(ApiError.internal("Внутренняя ошибка сервера"))
            }
        }
    }
    async get_by_passport(req,res,next){
        const {seria,nomer} = req.query
        if(!seria || !nomer) {
            return next(ApiError.badRequest(`Введите необходимые параметры seria и nomer`))
        }
        try{
            const user = await User.findAll({where:{
                seria,nomer
            }})
            if(user) res.status(200).json(user)
            else res.status(404).send("Пользователь с таким паспортом не найден")
        }
        catch(error){
            if(error instanceof ApiError){
                res.status(error.status).json({error:error.message})
            }
            else{
                console.error("Произошла ошибка",error)
                return next(ApiError.internal("Внутренняя ошибка сервера"))
            }
        }
    }
    async get_by_birthdayRange(req,res,next){
        const {from,to} = req.query
        if(!from || !to) {
            return next(ApiError.badRequest("Введите необходимые параметры from и to"))
        }
        //парсинг дат
        const fromDate = parse(from,'yyyy-MM-dd', new Date())
        const toDate = parse(to, 'yyyy-MM-dd', new Date())
        //валидация дат
        if(!isValid(fromDate) || !isValid(toDate)){
            return next(ApiError.badRequest("Неверный формат даты, введите в формате YYYY-MM-DD"))
        }
        const user = await User.findAll({where:{
            birthday:{
                [Op.between]:[fromDate,toDate]
            }
        }})
        if(user) res.status(200).json(user)
        else res.status(404).send(`Пользователь с ДР от ${fromDate} до ${toDate} не найден`)
    } 
    async get_by_phone(req,res,next){
        const phone = req.params.phone
        try{
            const user = await User.findAll({where:{
                phone
            }})
            if(user) res.status(200).json(user)
            else res.status(404).send("Пользователь с таким телефоном не найден")
        }
        catch(error){
            if(error instanceof ApiError){
                res.status(error.status).json({error:error.message})
            }
            else{
                console.error("Произошла ошибка",error)
                return next(ApiError.internal("Внутренняя ошибка сервера"))
            }
        }
    }
    async get_by_email(req,res,next){
        const email = req.params.email
        try{
            const user = await User.findAll({where:{
                email
            }})
            if(user) res.status(200).json(user)
            else res.status(404).send("Пользователь с такой эл.почтой не найден")
        }
        catch(error){
            if(error instanceof ApiError){
                res.status(error.status).json({error:error.message})
            }
            else{
                console.error("Произошла ошибка",error)
                return next(ApiError.internal("Внутренняя ошибка сервера"))
            }
        }
    }
    async get_by_vk(req,res,next){
        const vk = req.params.vk
        try{
            const user = await User.findAll({where:{
                vk
            }})
            if(user) res.status(200).json(user)
            else res.status(404).send("Пользователь с такой ссылкой Вконтакте не найден")
        }
        catch(error){
            if(error instanceof ApiError){
                res.status(error.status).json({error:error.message})
            }
            else{
                console.error("Произошла ошибка",error)
                return next(ApiError.internal("Внутренняя ошибка сервера"))
            }
        }
    }
    async get_by_tg(req,res,next){
        const tg = req.params.tg
        try{
            const user = await User.findAll({where:{
                tg
            }})
            if(user) res.status(200).json(user)
            else res.status(404).send("Пользователь с таким ником Телеграмма не найден")
        }
        catch(error){
            if(error instanceof ApiError){
                res.status(error.status).json({error:error.message})
            }
            else{
                console.error("Произошла ошибка",error)
                return next(ApiError.internal("Внутренняя ошибка сервера"))
            }
        }
    }
    async get_by_registr_at(req,res,next){
        const registr_at = req.params.registr_at
        try{
            const user = await User.findAll({where:{
                registr_at
            }})
            if(user) res.status(200).json(user)
            else res.status(404).send("Пользователь с таким адресом регистрации не найден")
        }
        catch(error){
            if(error instanceof ApiError){
                res.status(error.status).json({error:error.message})
            }
            else{
                console.error("Произошла ошибка",error)
                return next(ApiError.internal("Внутренняя ошибка сервера"))
            }
        }
    }
    async get_by_lives_now(req,res,next){
        const lives_now = req.params.lives_now
        try{
            const user = await User.findAll({where:{
                lives_now
            }})
            if(user) res.status(200).json(user)
            else res.status(404).send("Пользователь с таким адресом проживания не найден")
        }
        catch(error){
            if(error instanceof ApiError){
                res.status(error.status).json({error:error.message})
            }
            else{
                console.error("Произошла ошибка",error)
                return next(ApiError.internal("Внутренняя ошибка сервера"))
            }
        }
    }
}
module.exports = new GetPerson()