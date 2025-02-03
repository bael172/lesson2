const Router = require("express")
const router = new Router()

const user = require('../query/user.js')

router.post('/user/add',user.add)

module.exports = router