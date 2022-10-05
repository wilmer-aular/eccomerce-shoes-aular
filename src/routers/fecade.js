let router = require('express-promise-router')();
let apiRouter = require('./api/api.js');
let viewsRouter = require('./views/views.js');

router.use('/api', apiRouter);
router.use('/', viewsRouter);

module.exports = router;
