const express = require('express');
const router = express.Router();
const {find, create, updateDocument, deleteDocument, findById, findBlogsByUserId, findBlogsByTitle, findTags, findByTagName} = require('../controllers/blog');
const authBlogMiddleWare = require('../middlewares/blogMiddleWare');
const Blog = require('../models/blog');
const upload = require('../middlewares/multerImg');
router.get("/", async(req, res) => {
    const {limit, skip} = req.query;
    // console.log(limit, skip);
    find({}, +limit, +skip)
      .then((doc) => res.json(doc))
      .catch((e) => next(e));
    });

router.get("/:id", async(req, res) => {

  findById(req.params.id)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
  });

router.get("/search/title", async(req, res, next) => {
  const title = req.query.title;
  // console.log(title);
  findBlogsByTitle(title)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
  });  
router.get("/follow/:id", async(req, res) => {
  
  findBlogsByUserId(req.params.id)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
  });
router.get("/profileBlog/:id", async(req, res) => {

  findBlogsByUserId(req.params.id)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
  });
router.get("/get/tags", async(req, res) => {

  findTags()
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
  });
router.get("/getTags/:tag", async(req, res) => {
  const tagName = req.params.tag;
  findByTagName(tagName)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
  });
router.post("/create", upload.single("image"),  async(req, res, next) => {
    const blog = req.body;
    blog.tags = blog.tags.split(' ')
    blog.image = req.file.path; //attach the file data to req
    blog.author = req.user._id;
    // blog.author = "61d300e2ee5a7332d59389ef";
    const autoArr = await Blog.find({});
    blog.id = autoArr.length + 1;
    console.log(blog);
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
    
    router.patch("/:id", authBlogMiddleWare, upload.single("image"), (req, res, next) => {
      const id = req.params.id;
      const blog = req.body;
      blog.image = req.file?.path;

      updateDocument(id, blog)
        .then((doc) => res.json(doc))
        .catch((e) => next(e));
    });
module.exports = router;