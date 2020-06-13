const Images = require('../database/models/Images')
const path = require('path')

module.exports = (req, res) => {
    const { image } = req.files
    image.mv(path.resolve(__dirname, '..', 'public/galleryImages', image.name), (error) => {
        Images.create({
            ...req.body,
            imagefile: `galleryImages/${image.name}`
        }, (error) => {
            res.redirect('/dashboard')
        })        
    })
}
