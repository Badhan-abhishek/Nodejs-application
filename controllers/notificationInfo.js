const Notification = require('../database/models/Notification')

module.exports = async (req, res) => {
    try{
        const notifications = await Notification.findById(req.params.id)
        return res.render('notificationInfo',{
        notifications
    })
    }
    catch(err){
        console.log("Error from notification.js")
    }
}