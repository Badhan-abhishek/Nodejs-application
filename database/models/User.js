const bcrypt = require('bcryptjs')
const mongo = require('mongoose')

const UserSchema = new mongo.Schema({
   username: {
   	type: String,
   	required: true,
   	unique: true 
   },
   email: {
   	type: String,
   	required: true,
   	unique: true 
   },
   password: {
   	type: String,
   	required: true,
   },
})

UserSchema.pre('save', function(next){
	const user = this;

	bcrypt.hash(user.password, 10, function(error, encrypted){
		user.password = encrypted
		next()
	})
})


module.exports = mongo.model('User', UserSchema)