const api = require('./api/');
const home = require('./home-routes');
const dash = require('./dash-routes');
const router = require('express').Router();

router.use('/', home);
router.use('/dashboard', dash);
router.use('/api', api);


module.exports = router;