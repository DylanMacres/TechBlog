const { Post } = require('../../models/');

const withAuthorization = require('../../utils/authorization');

const router = require('express').Router();


router.post('/', withAuthorization, async (req, res) => {
    const body = req.body;
    try{
        const post = await Post.create({ ...body, userId: req.session.userId });
        res.json(post);
    }catch(err){
        res.status(500).json(err)
    }
});


router.put('/:id', withAuthorization, async (req,res) => {
    try{
        const [affectedStuff] = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if(affectedStuff > 0){
            res.status(200).end();
        }else {
            res.status(404).end();
        }
    }catch(err) {
        res.status(500).json(err);
    }
} );



router.delete('/:id', withAuthorization, async (req,res) => {
    try{
        const [affectedStuff] = Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        if(affectedStuff > 0 ) {
            res.status(200).end();

        }else{
            res.status(404).end();
        }
    }catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;