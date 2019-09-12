// @login & register
const express = require('express');
const router = express.Router();
const passport = require('passport');

const Station = require('../../models/Station');

// @route  GET api/profiles/test
// @desc   返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
    res.json({ msg: 'station works' });
});

// @route  POST api/profiles/add
// @desc   创建信息接口
// @access Private
router.post(
    '/add',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const stationFields = {};

        if (req.body.stationid) stationFields.stationid = req.body.stationid;
        if (req.body.stationname) stationFields.stationname = req.body.stationname;
        if (req.body.platid) stationFields.platid = req.body.platid;
        if (req.body.platname) stationFields.platname = req.body.platname;
        if (req.body.state) stationFields.state = req.body.state;

        new Station(stationFields).save().then(station => {
            res.json(station);
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
        Station.find()
            .then(station => {
                if (!station) {
                    return res.status(404).json('没有任何内容');
                }

                res.json(station);
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
        Station.findOne({ _id: req.params.id })
            .then(station => {
                if (!station) {
                    return res.status(404).json('没有任何内容');
                }

                res.json(station);
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
        const stationFields = {};

        if (req.body.stationid) stationFields.stationid = req.body.stationid;
        if (req.body.stationname) stationFields.stationname = req.body.stationname;
        if (req.body.platid) stationFields.platid = req.body.platid;
        if (req.body.platname) stationFields.platname = req.body.platname;
        if (req.body.state) stationFields.state = req.body.state;


        Station.findOneAndUpdate(
            { _id: req.params.id },
            { $set: stationFields },
            { new: true }
        ).then(station => res.json(station));
    }
);

// @route  POST api/profiles/delete/:id
// @desc   删除信息接口
// @access Private
router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Station.findOneAndRemove({ _id: req.params.id })
            .then(station => {
                station.save().then(station => res.json(station));
            })
            .catch(err => res.status(404).json('删除失败!'));
    }
);

module.exports = router;

