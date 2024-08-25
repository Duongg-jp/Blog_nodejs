class NewsController {
    // [GET] /news
    index(req, res) {
        res.render('news');
    }

    // [get] /news/:slug
    show(req, res) {
        res.send('news detail');
    }
}

module.exports = new NewsController();
