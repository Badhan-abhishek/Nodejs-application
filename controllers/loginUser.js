const User = require('../database/models/User')
const bcrypt = require('bcryptjs')


module.exports = (req, res) =>{
	const { username, password} = req.body
	User.findOne({ username}, (error, user) =>{
		if(user){
			bcrypt.compare(password, user.password, (error, same) => {
				if(same){
					req.session.userId = user._id
					res.redirect('/')
				} else {
				res.redirect('/auth/user')}
			})
		} else {
			return res.redirect('/auth/user')
		}
	})
}
