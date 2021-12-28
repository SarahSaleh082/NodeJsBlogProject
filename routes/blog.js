const express = require('express');
const router = express.Router();
const {find, create, updateDocument, deleteDocument} = require('../controllers/blog');
const authBlogMiddleWare = require('../middlewares/blogMiddleWare')
router.get("/", async (req, res) => {
    find({})
      .then((doc) => res.json(doc))
      .catch((e) => next(e));
    });

router.post("/", async (req, res, next) => {
    const blog = req.body;
    blog.author = req.user.username;
    create(blog)
      .then((doc) => res.json(doc))
      .catch((e) => next(e));
    });

    router.delete("/:id", authBlogMiddleWare, (req, res, next) => {
      const id = req.params.id;
      deleteDocument(id)
        .then((doc) => res.json(doc))
        .catch((e) => next(e));
    });
    
    router.patch("/:id", authBlogMiddleWare, (req, res, next) => {
      const id = req.params.id;
      const body = req.body;
      updateDocument(id, body)
        .then((doc) => res.json(doc))
        .catch((e) => next(e));
    });
module.exports = router;