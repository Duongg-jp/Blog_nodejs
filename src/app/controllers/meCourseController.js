const Course = require("../models/Course");

class meCourseController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render("me/stored-courses", { courses: courses.map(course => course.toObject()) });
      })
      .catch(next);
  }
}

module.exports = new meCourseController();
