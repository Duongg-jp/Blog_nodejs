const Course = require("../models/Course");

class SiteController {
  index(req, res, next) {
    Course.find({})
      .then(courses => {
        const plainCourses = courses.map(course => course.toObject());
        res.render('home', { courses: plainCourses });
      })
      .catch(err => res.status(400).json({ error: "errrr" }));
  }

  search(req, res) {
    res.send("Search functionality not yet implemented");
  }
}

module.exports = new SiteController();
