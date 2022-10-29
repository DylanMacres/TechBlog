const router = require('express').Router();
const { Post } = require('../models/');
const withAuthorization = require('../utils/authorization');


router.get('/', withAuthorization, async (req, res) => {
    try {
        const postStuff = await Post.findall({
            where: {
                userId: req.session.userId,
            },
        });
        const posts = postStuff.map((post) =>
        post.get({ plain: true}));

        res.render('all-posts-admin' , {
            layout: 'dashboard',
            posts,
        });
    }catch(err) {
        res.redirect('login')
    }
});