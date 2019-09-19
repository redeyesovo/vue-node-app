const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');

// 引入users.js
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const medias = require('./routes/api/medias');
const represents = require('./routes/api/represents');
const plats = require('./routes/api/plats');
const stations = require('./routes/api/stations');
const oas = require('./routes/api/oas');
const inrecords = require('./routes/api/inrecords');


// DB config
const db = require('./config/keys').mongoURI;

// 使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to mongodb
mongoose
  .connect(db,{useNewUrlParser:true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// passport 初始化
app.use(passport.initialize());
require('./config/passport')(passport);

//app.get("/",(req,res)=>{
//	res.send("hello");
//})

// 使用routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/medias', medias);
app.use('/api/represents', represents);
app.use('/api/plats', plats);
app.use('/api/stations', stations);
app.use('/api/oas', oas);
app.use('/api/inrecords', inrecords);

<<<<<<< HEAD
// 本地开发5000端口
=======
>>>>>>> refs/remotes/origin/master
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});