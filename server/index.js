const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogRequests = require('./routes/blog');
const userRequests = require('./routes/user');
const authMiddleWare = require('./middlewares/auth')
process.env.SECRET = 'sgagdjsadjabsfasbfhsabh';

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
mongoose.connect("mongodb://localhost:27017/blogProject");
app.use("/users", userRequests);
app.use(authMiddleWare);
app.use("/", blogRequests);

app.use("*", (req, res) => {
    res.status(404).end();
  });
  
  app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
  });
  
  app.listen(3000, () => {
    console.log("Connection Started on port 3000");
  });
  