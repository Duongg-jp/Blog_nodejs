import fetch from 'node-fetch'; // Sử dụng import cho node-fetch
import Course from "../models/Course"; // Import mô hình Course

class CourseController {
  // [GET] /courses/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        if (course) {
          res.render("courses/show", { course });
        } else {
          res.status(404).send("Khóa học không tồn tại");
        }
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
          res.render("courses/edit", { course: course.toObject() });
        } else {
          res.status(404).send("Khóa học không tồn tại");
        }
      })
      .catch(next);
  }

  // [PORT] /courses/store
  async store(req, res, next) {
    const formData = req.body;

    try {
      const response = await fetch(`https://img.youtube.com/vi/${req.body.videoID}/maxresdefault.jpg`);
      
      if (response.ok) {
        formData.image = `https://img.youtube.com/vi/${req.body.videoID}/maxresdefault.jpg`;
      } else {
        const fallbackResponse = await fetch(`https://img.youtube.com/vi/${req.body.videoID}/hqdefault.jpg`);
        if (fallbackResponse.ok) {
          formData.image = `https://img.youtube.com/vi/${req.body.videoID}/hqdefault.jpg`;
        } else {
          formData.image = 'https://example.com/default-image.jpg';
        }
      }

      // Tạo một đối tượng Course mới và lưu vào cơ sở dữ liệu
      const course = new Course(formData);
      await course.save();

      res.redirect("/");
    } catch (error) {
      console.error("Error fetching image:", error);
      res.status(500).send("Error saving course. Please try again.");
    }
  }

  // [PUT] /courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }

  // [DELETE] /courses/:id
  delete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

export default new CourseController();
