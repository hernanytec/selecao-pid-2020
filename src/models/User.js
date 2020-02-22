const mongoogse = require('mongoose')

const UserSchema = new mongoogse.Schema({
    nome: { type: String, text: true },
    cpf: { type: String, unique: true },
    rg: { type: String, unique: true },
    data_nasc: Date,
    nome_mae: String,
    nome_pai: String,
    foto_url: String,
    data_cad: Date
})

module.exports = mongoogse.model('user', UserSchema)