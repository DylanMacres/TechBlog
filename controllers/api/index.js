const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');


const router = require('express').Router();



router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);


module.exports = router;