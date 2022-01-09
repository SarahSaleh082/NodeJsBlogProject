const express = require('express');
const router = express.Router();
const {find, create, login, follow, getFollowing, like, getLikes} = require('../controllers/user');
const { update } = require('../models/blog');
const upload = require('../middlewares/multerImg');

router.get("/", async (req, res, next) => {
    find({})
      .then((doc) => res.json(doc))
      .catch((e) => next(e));
    });

router.get("/:username", async (req, res, next) => {
  const username = req.params.username;
  find({username})
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
  });
router.get("/following/:id", async (req, res, next) => {
  const id  = req.params.id;
  getFollowing(id)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
  });    
router.post("/register", upload.single("image"), async (req, res, next) => {
    const user = req.body;
    user.image = req.file.path;
    create(user)
      .then((doc) => res.json(doc))
      .catch((e) => next(e));
    });
router.post("/login", async (req, res, next) => {
    const {username, password} = req.body;
    const token = await login({username, password}, res, next)
        res.json(token);
    });
router.patch("/follow/:id", async (req, res, next) => {
  const ID = req.body.ID;
  const id = req.params.id;
  follow(id, ID)
      .then((doc) => res.json(doc))
      .catch((e) => next(e));
  });

router.patch("/like/:id", async (req, res, next) => {
  const blogId = req.body.blogId;
  const id = req.params.id;
  like(id, blogId)
      .then((doc) => res.json(doc))
      .catch((e) => next(e));
  });

router.get("/likes/:id", async (req, res, next) => {
  const id  = req.params.id;
  getLikes(id)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
  });
module.exports = router;