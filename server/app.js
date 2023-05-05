var express = require('express');
require("dotenv").config()
const mongoose = require('mongoose');
const cors = require('cors');

const mongoDB = process.env.MONGODB_URL || "mongodb+srv://itssagar11:0135india@cluster0.4yxhpzs.mongodb.net/library?retryWrites=true&w=majority://localhost:27017/mongodb+srv://itssagar11:0135Indi@@cluster0.mdd4cvd.mongodb.net/?libraryretryWrites=true";



var app = express();
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'OPTIONS'],
}))
var indexRoute = require('./routes/index.js');
var authRouter = require('./routes/auth.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use('/', indexRoute);

app.use('/auth', authRouter);


mongoose.connect(mongoDB, { useNewUrlParser: true, w: "majority" })
  .then((res) => {
    console.log("connected to database")
  })
  .catch((err) => { console.log(err) });


app.listen(3000, () => {
  console.log("Server Starts on 3000");
});