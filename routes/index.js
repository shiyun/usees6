'use strict';
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.get('/news', (req, res, next) => {
    res.render('newsList', {title: '法宝网-新闻活动', curNum: 1});
});

module.exports = router;
