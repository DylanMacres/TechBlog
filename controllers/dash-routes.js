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


router.get('/new', withAuthorization, (req, res) => {
    res.render('new-post', {
        layout: 'dashboard',
    });
});


router.get('/edit/:id', withAuthorization, async, (req, res) => {
    try{
        const postStuff = await Post.findByPk(req.params.id);
        if(postStuff){
            const post = postStuff.get({
                plain: true
            });
            res.render('edit-post', {
                layout: 'dashboard',
                post,
            });
        } else{ 
            res.status(420).end();

        }
    }catch(err) {
        res.redirect('login')
    }
});


module.exports = router;