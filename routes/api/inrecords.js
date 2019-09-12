// @login & register
const express = require('express');
const router = express.Router();
const passport = require('passport');

const Inrecord = require('../../models/Inrecord');

// @route  GET api/profiles/test
// @desc   返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
    res.json({ msg: 'inrecord works' });
});

// @route  POST api/profiles/add
// @desc   创建信息接口
// @access Private
router.post(
    '/add',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const inrecordFields = {};

        if (req.body.streamid) inrecordFields.streamid = req.body.streamid;
        if (req.body.streamtime) inrecordFields.streamtime = req.body.streamtime;
        if (req.body.medianame) inrecordFields.medianame = req.body.medianame;
        if (req.body.representname) inrecordFields.representname = req.body.representname;
        if (req.body.money) inrecordFields.money = req.body.money;
        if (req.body.description) inrecordFields.description = req.body.description;
        if (req.body.operator) inrecordFields.operator = req.body.operator;

        new Inrecord(inrecordFields).save().then(inrecord => {
            res.json(inrecord);
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
        Inrecord.find()
            .then(inrecord => {
                if (!inrecord) {
                    return res.status(404).json('没有任何内容');
                }

                res.json(inrecord);
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
        Inrecord.findOne({ _id: req.params.id })
            .then(inrecord => {
                if (!inrecord) {
                    return res.status(404).json('没有任何内容');
                }

                res.json(inrecord);
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
        const inrecordFields = {};

        if (req.body.streamid) inrecordFields.streamid = req.body.streamid;
        if (req.body.streamtime) inrecordFields.streamtime = req.body.streamtime;
        if (req.body.medianame) inrecordFields.medianame = req.body.medianame;
        if (req.body.representname) inrecordFields.representname = req.body.representname;
        if (req.body.money) inrecordFields.money = req.body.money;
        if (req.body.description) inrecordFields.description = req.body.description;
        if (req.body.operator) inrecordFields.operator = req.body.operator;


        Inrecord.findOneAndUpdate(
            { _id: req.params.id },
            { $set: inrecordFields },
            { new: true }
        ).then(inrecord => res.json(inrecord));
    }
);

// @route  POST api/profiles/delete/:id
// @desc   删除信息接口
// @access Private
router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Inrecord.findOneAndRemove({ _id: req.params.id })
            .then(inrecord => {
                inrecord.save().then(inrecord => res.json(inrecord));
            })
            .catch(err => res.status(404).json('删除失败!'));
    }
);

module.exports = router;

