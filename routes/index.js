'use strict';
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.get('/news', (req, res, next) => {
    res.render('newsList', {title: '法宝网-新闻活动', curNum: 1});
});

// 联系我们
router.get('/contactUs', (req, res, next) => {
    res.render('contactUs', {title: '法宝网-联系我们', curNum: 6});
});

module.exports = router;
