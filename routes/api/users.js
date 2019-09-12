const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const User = require('../../models/User');

// @route  GET api/users/test
// @desc   返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
  res.json({ msg: 'login works' });
});
// @route  POST api/users/register注册
// @desc   返回的请求的json数据
// @access public
router.post('/register', (req, res) => {
    //console.log(req.body);
    // 查询数据库中是否拥有邮箱
  User.findOne({email:req.body.email})
      .then(user => {
        if(user){
          return res.status(400).json('邮箱已被注册!');
        }else{
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
              avatar,
            password: req.body.password
          })
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;

                    newUser.password = hash;

                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });

        }
      })
});

// @route  POST api/users/login登陆
// @desc   返回token jwt passport
// @access public
router.post("/login",(req,res)=>{
    const name = req.body.name;
    const password = req.body.password;
    User.findOne({ name })
        .then(user=>{
            if(!user){
                return res.status(404).json("用户不存在");
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        const rule = {id:user.id,name:user.name,avatar: user.avatar};
                        jwt.sign(rule,keys.secretOrKey,{expiresIn: 3600},(err,token)=> {
                            if (err) throw err;
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                    });
                        //res.json({msg:"success"});
                    }else{
                        return res.status(404).json("密码错误");
                    }
                })
        })
})

// @route  GET api/users/current用户发出请求（信息）
// @desc   return current user返回当前用户信息
// @access Private私密
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
        });
    }
);


module.exports = router;