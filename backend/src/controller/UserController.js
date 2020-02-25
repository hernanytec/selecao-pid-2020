const User = require('../models/User')

module.exports = {
    async store(req, res) {
        //pega o nome do arquivo que foi salvo em uploads
        const { filename } = req.file
        const acutal_date = new Date() //pega a data atual

        let user_data = req.body
        user_data.foto = filename
        user_data.data_cad = acutal_date
        user_data.foto_historico = [filename]

        await User.create(user_data, function (error, result) {
            if (error) {
                return res.status(500).send(error);
            }
            else {
                return res.status(200).send(result);
            }
        })
    },

    async update(req, res) {
        const { _id } = req.params
        const { filename } = req.file

        const user = await User.findByIdAndUpdate({ _id }, {
            foto: filename,
            data_cad: new Date(),
            //adiciona a nova foto no array de fotos
            $push: { foto_historico: filename }
        })

        return user ? res.send(user) : res.status(404).send()
    },

    async delete(req, res) {
        const { key } = req.params

        const user = await User.findOneAndDelete({ $or: [{ cpf: key }, { rg: key }] })

        return user ? res.send(user) : res.status(404).send()
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