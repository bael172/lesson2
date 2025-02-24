const Router = require("express")
const router = new Router()

const user = require('../queries/user.js')

router.post('/user/add',user.add)

module.exports = router