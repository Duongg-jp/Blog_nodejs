const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
  name: {type: String, default: 'khóa học'},
  image: {type: String, default: 'https://www.vietcap.com.vn/api/cms-api/uploads/froala/images/tien-re-la-gi.jpg'},
  description: {type: String, default: 'khóa học kiếm tiền'},
  created_at: {type: Date, default:Date.now()},
  updated_at: {type: Date, default:Date.now()},
});

module.exports = mongoose.model('Course', Course);