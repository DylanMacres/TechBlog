const { Post, Comment, User } = require('../models/');

const router = require('express').Router();


router.get('/', async (req,res) => {
    try{
        const data = await Post.findAll({
            include: [User],
        });
        const posts = data.map((post) => post.get({ plain: true }));

        res.render('all-posts' , {
            posts 
        });
    }catch(err) {
        res.status(500).json(err);
    }
});


router.get('/post/:id')