/*
*external imports
*/
const express = require('express');
const router = express.Router();

/*
*internal imports
*/
const {getInbox} = require('../controller/inboxController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

//inbox page
router.get('/',decorateHtmlResponse('inbox'),getInbox);

module.exports = router;