const mongoogse = require('mongoose')

const UserSchema = new mongoogse.Schema({
    nome: String,
    cpf: String,
    rg: String,
    data_nasc: Date,
    nome_mae: String,
    nome_pai: String,
    foto_url: String,
    data_cadastro: Date
})

module.exports = mongoogse.model('user', UserSchema)