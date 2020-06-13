const Notification = require('../database/models/Notification')
module.exports = (req, res) => {
    Notification.create(req.body, (error, notifications) => {
        if(error){
            return res.redirect('/')
        }
            return res.redirect('/dashboard')
    })
}






