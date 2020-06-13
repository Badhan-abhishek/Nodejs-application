const Certificate = require('../database/models/Certificate')

module.exports = async (req, res) => {
    const certificates = await Certificate.find({})
    res.render('certificate', {
        certificates
    })
}