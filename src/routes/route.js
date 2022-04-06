const express = require('express');
const logger = require('../logger/loggar')
const helper=require("../util/helper");
const chunk = require("lodash/chunk");
const tail = require('lodash/tail');
const union = require('lodash/union');
const fromPairs = require('lodash/fromPairs');
const chunk = chunk();
const tail = tail();
const union= union();
const fromPairs=fromPairs();
const router = express.Router();

router.get('/test-me', function (req, res) {
    helper.date()
    helper.month()
    helper.date()
    logger.welcome()
    res.send('My first ever api!')
});

module.exports = router;
// adding this comment for no reason