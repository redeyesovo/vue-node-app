// @login & register
const express = require('express');
const router = express.Router();
const passport = require('passport');

const OA = require('../../models/OA');

// @route  GET api/profiles/test
// @desc   返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
    res.json({ msg: 'oa works' });
});

// @route  POST api/profiles/add
// @desc   创建信息接口
// @access Private
router.post(
    '/add',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const oaFields = {};

        if (req.body.oaid) oaFields.oaid = req.body.oaid;
        if (req.body.oaname) oaFields.oaname = req.body.oaname;
        if (req.body.stationname) oaFields.stationname = req.body.stationname;
        if (req.body.platname) oaFields.platname = req.body.platname;
        if (req.body.source) oaFields.source = req.body.source;
        if (req.body.runer) oaFields.runer = req.body.runer;
        if (req.body.sex) oaFields.sex = req.body.sex;
        if (req.body.company) oaFields.company = req.body.company;
        if (req.body.state) oaFields.state = req.body.state;

        new OA(oaFields).save().then(oa => {
            res.json(oa);
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
        OA.find()
            .then(oa => {
                if (!oa) {
                    return res.status(404).json('没有任何内容');
                }

                res.json(oa);
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
        OA.findOne({ _id: req.params.id })
            .then(oa => {
                if (!oa) {
                    return res.status(404).json('没有任何内容');
                }

                res.json(oa);
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
        const oaFields = {};

        if (req.body.oaid) oaFields.oaid = req.body.oaid;
        if (req.body.oaname) oaFields.oaname = req.body.oaname;
        if (req.body.stationname) oaFields.stationname = req.body.stationname;
        if (req.body.platname) oaFields.platname = req.body.platname;
        if (req.body.source) oaFields.source = req.body.source;
        if (req.body.runer) oaFields.runer = req.body.runer;
        if (req.body.sex) oaFields.sex = req.body.sex;
        if (req.body.company) oaFields.company = req.body.company;
        if (req.body.state) oaFields.state = req.body.state;


        OA.findOneAndUpdate(
            { _id: req.params.id },
            { $set: oaFields },
            { new: true }
        ).then(oa => res.json(oa));
    }
);

// @route  POST api/profiles/delete/:id
// @desc   删除信息接口
// @access Private
router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        OA.findOneAndRemove({ _id: req.params.id })
            .then(oa => {
                oa.save().then(oa => res.json(oa));
            })
            .catch(err => res.status(404).json('删除失败!'));
    }
);

module.exports = router;

