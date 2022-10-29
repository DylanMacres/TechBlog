const router = require('express').Router();
const { Post } = require('../models/');
const withAuthorization = require('../utils/authorization');


router.get('/', withAuthorization, async (req, res) => {
    try {
        const post = await Post.findall({
            where: {
                userId: req.session.userId,
            }
        })
    }
})