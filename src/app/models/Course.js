const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');


mongoose.plugin(slug);

const CourseSchema = new Schema(
  {
    name: { type: String },
    image: { type: String },
    videoID:{type: String,},
    description: { type: String },
    slug: { type: String, slug: 'name' }
  },
  {
    timestamps: true,
  }
);

// Tạo model từ schema
module.exports = mongoose.model("Course", CourseSchema);
