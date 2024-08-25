const Course = require('../Models/Course');

class SiteController {
  async index(req, res) {
    try {
      const courses = await Course.find({});
      res.json(courses);
    } catch (err) {
      res.status(400).json({ error: "errrr" });
    }
  }

  search(req, res) {
    res.send("Search functionality not yet implemented");
  }
}

module.exports = new SiteController();
