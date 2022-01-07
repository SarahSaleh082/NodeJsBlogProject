const express = require('express');
const router = express.Router();
const {find, create, login, follow, getFollowing} = require('../controllers/user');
const { update } = require('../models/blog');

router.get("/", async (req, res, next) => {
    find({})
      .then((doc) => res.json(doc))
      .catch((e) => next(e));
    });

router.get("/following/:id", async (req, res, next) => {
  const id  = req.params.id;
  getFollowing(id)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
  });    
router.post("/register", async (req, res, next) => {
    const user = req.body;
    create(user)
      .then((doc) => res.json(doc))
      .catch((e) => next(e));
    });
router.post("/login", async (req, res, next) => {
    const {username, password} = req.body;
    const token = await login({username, password})
        res.json(token);
    });
router.patch("/follow/:id", async (req, res, next) => {
  const username = req.body.username;
  const id = req.params.id;
  follow(id, username)
      .then((doc) => res.json(doc))
      .catch((e) => next(e));
  });
  
module.exports = router;