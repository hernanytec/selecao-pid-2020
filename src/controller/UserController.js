//index, show, store, update, destroy

const User = require('../models/User')
module.exports = {
    async store(req, res) {
        //pega o nome do arquivo que foi salvo em uploads
        const { filename } = req.file

        let user_data = req.body
        user_data.foto_url = filename
        user_data.data_cad = new Date()//pega a data atual

        await User.create(user_data, function (error, result) {
            if (error) {
                return res.status(500).send(error);
            }
            else {
                console.log(result)
                return res.status(200).send({ ok: true });
            }
        })
    }
}