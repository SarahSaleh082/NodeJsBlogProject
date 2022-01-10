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
app.use("/uploads", express.static("uploads")); //public image availability

// mongoose.connect("mongodb://localhost:27017/blogProject");
mongoose.connect("mongodb+srv://m001-student:m001-mongodb-basics@sandbox.kuvtw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

app.use("/users", userRequests);
app.use(authMiddleWare);
app.use("/", blogRequests);

app.use("*", (req, res) => {
    res.status(404).end();
  });
  
  app.use((err, req, res, next) => {
    res.status(500).json(err);
  });
  
  const PORT = process.env.PORT || 8080
  app.listen(PORT, () => {
    console.log("Connection Started on port 8080");
  });
  