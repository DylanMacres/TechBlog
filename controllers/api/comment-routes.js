const { Comment } = require('../../models/');

const withAuthorization = require('../../utils/authorization');

const router = require('express').Router();


router.post('/', withAuthorization, async (req, res) => {
    try{
        const comment = await Comment.create({
            ...req.body,
            userId: req.session.userId,
        });
        res.json(comment);
    }catch(err){
        res.status(500).json(err)
    }
});

module.exports = router;