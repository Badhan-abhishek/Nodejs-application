const mongo = require('mongoose')

CertificateSchema = new mongo.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongo.model('Certificate', CertificateSchema)