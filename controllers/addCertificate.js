const Certificate = require('../database/models/Certificate')
const path = require('path')

module.exports = (req, res) => {
    const { certificate } = req.files
    const certificateOther = req.body
    certificate.mv(path.resolve(__dirname, '..', 'public/pdf', certificate.name), (error) => {
        Certificate.create({
            ...req.body, 
            name: `/pdf/${certificate.name}`,
            title: certificateOther.title,
            description: certificateOther.description
        }, (error) => {
            res.redirect('/dashboard')
        })
    });
}