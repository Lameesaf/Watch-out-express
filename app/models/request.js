const mongoose = require('mongoose')
const User = require('./user').User
const statusSchema = new mongoose.Schema({
  status: {type: String, required: true}
})
const Status = mongoose.model('Status', statusSchema)


const reviewSchema = new mongoose.Schema({

  user_id: {
    type:mongoose.Schema.Types.ObjectId,
    ref: User
  },
  title: {type: String, required:true},
  content: {type: String, required:true},
}, {timestamps: true,})
  
const requestSchema = new mongoose.Schema({

  user_id: {
    type:mongoose.Schema.Types.ObjectId,
    ref: User
  },
  shop_name: {type: String, required:true},
  shift: {type: String, required:true},
  days: [String],
  details: {type: String, required:true},
  status: {
    type:mongoose.Schema.Types.ObjectId,
    ref: Status
  },
  review: reviewSchema,
}, {timestamps: true,})


const Request = mongoose.model('Request', requestSchema)
const Review = mongoose.model('Review', reviewSchema)

module.exports = {Request, Status, Review}
