const Router = require("express")
const router = new Router()

const user = require("../queries/get_user.js")

router.get('/by_id:id',user.get_by_id)
router.get('/by_fio_AND',user.get_by_fio_AND)
router.get('/by_fio_OR',user.get_by_fio_OR)
router.get('/by_passport',user.get_by_passport)
router.get('/by_birthday_range',user.get_by_birthdayRange)
router.get('/by_phone',user.get_by_phone)
router.get('/by_email',user.get_by_email)
router.get('/by_vk',user.get_by_vk)
router.get('/by_tg',user.get_by_tg),
router.get('/by_registr_at',user.get_by_registr_at)
router.get('/by_lives_now',user.get_by_lives_now)

module.exports = router