const Images = require('../database/models/Images')

module.exports = async (req, res) => {
	const images = await Images.find({})
		res.render('gallery', {
			images
	})
}