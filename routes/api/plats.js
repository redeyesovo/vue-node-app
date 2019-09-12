// @login & register
const express = require('express');
const router = express.Router();
const passport = require('passport');

const Plat = require('../../models/Plat');

// @route  GET api/profiles/test
// @desc   返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
    res.json({ msg: 'plat works' });
});

// @route  POST api/profiles/add
// @desc   创建信息接口
// @access Private
router.post(
    '/add',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const platFields = {};

        if (req.body.platid) platFields.platid = req.body.platid;
        if (req.body.platname) platFields.platname = req.body.platname;
        if (req.body.description) platFields.description = req.body.description;
        if (req.body.state) platFields.state = req.body.state;

        new Plat(platFields).save().then(plat => {
            res.json(plat);
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
        Plat.find()
            .then(plat => {
                if (!plat) {
                    return res.status(404).json('没有任何内容');
                }

                res.json(plat);
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
        Plat.findOne({ _id: req.params.id })
            .then(plat => {
                if (!plat) {
                    return res.status(404).json('没有任何内容');
                }

                res.json(plat);
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
        const platFields = {};

        if (req.body.platid) platFields.platid = req.body.platid;
        if (req.body.platname) platFields.platname = req.body.platname;
        if (req.body.description) platFields.description = req.body.description;
        if (req.body.state) platFields.state = req.body.state;


        Plat.findOneAndUpdate(
            { _id: req.params.id },
            { $set: platFields },
            { new: true }
        ).then(plat => res.json(plat));
    }
);

// @route  POST api/profiles/delete/:id
// @desc   删除信息接口
// @access Private
router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Plat.findOneAndRemove({ _id: req.params.id })
            .then(plat => {
                plat.save().then(plat => res.json(plat));
            })
            .catch(err => res.status(404).json('删除失败!'));
    }
);

module.exports = router;

