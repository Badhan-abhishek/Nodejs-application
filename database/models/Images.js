const mongo = require('mongoose')

ImagesSchema = new mongo.Schema({
    imagefile: String
})

module.exports = mongo.model('Images', ImagesSchema)