// @login & register
const express = require('express');
const router = express.Router();
const passport = require('passport');

const Media = require('../../models/Media');

// @route  GET api/profiles/test
// @desc   返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
    res.json({ msg: 'media works' });
});

// @route  POST api/profiles/add
// @desc   创建信息接口
// @access Private
router.post(
    '/add',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const mediaFields = {};

        if (req.body.mediaid) mediaFields.mediaid = req.body.mediaid;
        if (req.body.medianame) mediaFields.medianame = req.body.medianame;
        if (req.body.state) mediaFields.state = req.body.state;

        new Media(mediaFields).save().then(media => {
            res.json(media);
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
        Media.find()
            .then(media => {
                if (!media) {
                    return res.status(404).json('没有任何内容');
                }

                res.json(media);
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
        Media.findOne({ _id: req.params.id })
            .then(media => {
                if (!media) {
                    return res.status(404).json('没有任何内容');
                }

                res.json(media);
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
        const mediaFields = {};

        if (req.body.mediaid) mediaFields.mediaid = req.body.mediaid;
        if (req.body.medianame) mediaFields.medianame = req.body.medianame;
        if (req.body.state) mediaFields.state = req.body.state;


        Media.findOneAndUpdate(
            { _id: req.params.id },
            { $set: mediaFields },
            { new: true }
        ).then(media => res.json(media));
    }
);

// @route  POST api/profiles/delete/:id
// @desc   删除信息接口
// @access Private
router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Media.findOneAndRemove({ _id: req.params.id })
            .then(media => {
                media.save().then(media => res.json(media));
            })
            .catch(err => res.status(404).json('删除失败!'));
    }
);

module.exports = router;

