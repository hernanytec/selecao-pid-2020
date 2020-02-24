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

UserSchema.index({ nome: 'text' })

UserSchema.virtual('foto_url').get(function () {
    return `http://localhost:3333/files/${this.foto}`
})

UserSchema.virtual('historico_foto_url').get(function () {
    const urls = this.foto_historico.map(s => {
        return `http://localhost:3333/files/${s}`
    })
    return urls
})

module.exports = mongoogse.model('user', UserSchema)