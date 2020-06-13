const Notification = require('../database/models/Notification')
module.exports = async (req, res) => {
	const notifications = await Notification.find().sort( { _id: -1 } )   
	res.render('index', {
		notifications
	})
}