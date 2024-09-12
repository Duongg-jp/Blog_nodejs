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
  // [PORT] /courses/store
  store(req, res, next) {
    const formData = req.body;
    formData.image = `https://img.youtube.com/vi/${req.body.videoID}/maxresdefault.jpg`;
    const course = new Course(req.body);
    course
      .save()

      .then(() => res.redirect("/"))
      .catch((error) => {
        
      });
  }
}

module.exports = new CourseController();
