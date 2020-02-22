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
    },

    //lista todos os usuários
    async index(req, res) {
        const users = await User.find({})
        return res.send(users);
    },

    //lista todos os usuários com determinado nome
    async indexName(req, res) {
        const { nome } = req.params

        const users = await User.find({ $text: { $search: nome } })
        return res.send(users);
    },

    //busca um usuário dado o cpf ou rg
    async show(req, res) {
        const { key } = req.params

        const user = await User.findOne({ $or: [{ cpf: key }, { rg: key }] })

        return user ? res.send(user) : res.status(404).send()
    },

}