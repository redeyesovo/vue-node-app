// @login & register
const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../../models/Profile');

// @route  GET api/profiles/test
// @desc   返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
    res.json({ msg: 'profile works' });
});

// @route  POST api/profiles/add
// @desc   创建信息接口
// @access Private
router.post(
    '/add',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const profileFields = {};

        if (req.body.username) profileFields.username = req.body.username;
        if (req.body.othername) profileFields.othername = req.body.othername;
        if (req.body.ifuseful) profileFields.ifuseful = req.body.ifuseful;
        if (req.body.description) profileFields.description = req.body.description;
        if (req.body.character) profileFields.character = req.body.character;
        if (req.body.creater) profileFields.creater = req.body.creater;

        new Profile(profileFields).save().then(profile => {
            res.json(profile);
        });
    }
);

// @route  GET api/profiles
// @desc   获取所有信息
// @access Private

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.find()
            .then(profile => {
                if (!profile) {
                    return res.status(404).json('没有任何内容');
                }

                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
    }
);

// @route  GET api/profiles/:id
// @desc   获取单个信息
// @access Private

router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ _id: req.params.id })
            .then(profile => {
                if (!profile) {
                    return res.status(404).json('没有任何内容');
                }

                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
    }
);

// @route  POST api/profiles/edit
// @desc   编辑信息接口
// @access Private
router.post(
    '/edit/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const profileFields = {};

        if (req.body.username) profileFields.username = req.body.username;
        if (req.body.othername) profileFields.othername = req.body.othername;
        if (req.body.ifuseful) profileFields.ifuseful = req.body.ifuseful;
        if (req.body.description) profileFields.description = req.body.description;
        if (req.body.character) profileFields.character = req.body.character;
        if (req.body.creater) profileFields.creater = req.body.creater;

        Profile.findOneAndUpdate(
            { _id: req.params.id },
            { $set: profileFields },
            { new: true }
        ).then(profile => res.json(profile));
    }
);

// @route  POST api/profiles/delete/:id
// @desc   删除信息接口
// @access Private
router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOneAndRemove({ _id: req.params.id })
            .then(profile => {
                profile.save().then(profile => res.json(profile));
            })
            .catch(err => res.status(404).json('删除失败!'));
    }
);

module.exports = router;

