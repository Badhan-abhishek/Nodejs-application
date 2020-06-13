const Notification = require('../database/models/Notification')
var ObjectId = require('mongodb').ObjectID;

module.exports =  (req, res) => {
    Notification.findByIdAndDelete(req.params.id, (error) => {
      if(error){
        console.log(error)
      return  res.redirect('/dashboarabfv')
      }
      res.redirect('/')
    })
}




//  Notification.deleteOne(notification, (err) => {
//         if(!err){
//             return res.redirect('/')
//         }
//         return res.redirect('/badfk')
//     })
