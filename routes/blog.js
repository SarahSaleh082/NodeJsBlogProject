const express = require('express');
const router = express.Router();
const {find, create} = require('../controllers/blog');

router.get("/", async (req, res) => {
    find({})
      .then((doc) => res.json(doc))
      .catch((e) => next(e));
    });

router.post("/", async (req, res, next) => {
    const blog = req.body;
    create(blog)
      .then((doc) => res.json(doc))
      .catch((e) => next(e));
    });
module.exports = router;