module.exports = (req, res) => {
	req.session.destroy( (error) => {
		console.log(error)
		res.redirect('/')
	})
}