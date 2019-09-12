// @login & register
const express = require('express');
const router = express.Router();
const passport = require('passport');

const Represent = require('../../models/Represent');

// @route  GET api/profiles/test
// @desc   返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
    res.json({ msg: 'represent works' });
});

// @route  POST api/profiles/add
// @desc   创建信息接口
// @access Private
router.post(
    '/add',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const representFields = {};

        if (req.body.representid) representFields.representid = req.body.representid;
        if (req.body.representname) representFields.representname = req.body.representname;
        if (req.body.description) platFields.description = req.body.description;
        if (req.body.state) representFields.state = req.body.state;

        new Represent(representFields).save().then(represent => {
            res.json(represent);
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
        Represent.find()
            .then(represent => {
                if (!represent) {
                    return res.status(404).json('没有任何内容');
                }

                res.json(represent);
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
        Represent.findOne({ _id: req.params.id })
            .then(represent => {
                if (!represent) {
                    return res.status(404).json('没有任何内容');
                }

                res.json(represent);
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
        const representFields = {};

        if (req.body.representid) representFields.representid = req.body.representid;
        if (req.body.representname) representFields.representname = req.body.representname;
        if (req.body.description) representFields.description = req.body.description;
        if (req.body.state) representFields.state = req.body.state;


        Represent.findOneAndUpdate(
            { _id: req.params.id },
            { $set: representFields },
            { new: true }
        ).then(represent => res.json(represent));
    }
);

// @route  POST api/profiles/delete/:id
// @desc   删除信息接口
// @access Private
router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Represent.findOneAndRemove({ _id: req.params.id })
            .then(represent => {
                represent.save().then(represent => res.json(represent));
            })
            .catch(err => res.status(404).json('删除失败!'));
    }
);

module.exports = router;

