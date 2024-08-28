const Course = require("../models/Course");

class SiteController {
  index(req, res, next) {
    Course.find({})
      .then(courses => res.render('home',{courses}))
      .catch(err => res.status(400).json({ error: "errrr" }));
  }

  search(req, res) {
    res.send("Search functionality not yet implemented");
  }
}

module.exports = new SiteController();
