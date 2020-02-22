const mongoogse = require('mongoose')

const UserSchema = new mongoogse.Schema({
    nome: { type: String, text: true },
    cpf: { type: String, unique: true },
    rg: { type: String, unique: true },
    data_nasc: Date,
    nome_mae: String,
    nome_pai: String,
    foto: String,
    foto_historico: [String],
    data_cad: Date
}, {
    toJSON: {
        virtuals: true
    }
})

UserSchema.virtual('foto_url').get(function () {
    return `http://localhost:3333/files/${this.foto}`
})

module.exports = mongoogse.model('user', UserSchema)