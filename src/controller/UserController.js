//index, show, store, update, destroy

const User = require('../models/User')
module.exports = {
    async store(req, res) {
        const { filename } = req.file

        let user_data = req.body
        user_data.foto_url = filename
        user_data.data_cadastro = new Date()

        const user = await User.create(user_data)
        console.log(user)
        return res.json({ ok: true })
    }
}