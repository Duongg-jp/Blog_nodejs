const Course = require("../models/Course");

class CourseController {
  // [GET] /courses/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("courses/show", { course });
      })
      .catch(next);
  }

  // [GET] /courses/create
  create(req, res, next) {
    res.render("courses/create");
  }

  // [GET] /courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) => {
        if (course) {
          // Render view với dữ liệu course đã chuyển thành plain object
          res.render("courses/edit", { course: course.toObject() });
        } else {
          res.status(404).send("Khóa học không tồn tại");
        }
      })
      .catch(next);
  }

  // [PORT] /courses/store
  store(req, res, next) {
    const formData = req.body;
    formData.image = `https://img.youtube.com/vi/${req.body.videoID}/mqdefault.jpg`;
    const course = new Course(req.body);
    course
      .save()

      .then(() => res.redirect("/"))
      .catch((error) => {});
  }

// [PUT] /courses/:id
update(req, res, next) {
  Course.updateOne({ _id: req.params.id }, req.body) 
  .then(() => res.redirect("/me/stored/courses"))
  .catch(next);
}

// [delete] /courses/:id
delete(req,res,next){
  Course.deleteOne({ _id: req.params.id})
  .then(() => res.redirect("back"))
  .catch(next);
}

}

module.exports = new CourseController();
