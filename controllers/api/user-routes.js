const { User } = require('../../models/');

const router = require('express').Router();


router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        req.session.save(() => {
            req.session.userId = newUser.id; 
            req.session.username = newUser.username; 
            req.session.loggedIn = true;

            res.json(newUser);
        });
    }catch(err) {
        res.status(500).json(err);
    }
});


router.post('/login', async (req,res ) => {
    try{
        const user = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if(!user) {
            res.status(400).json({ message: "Not the droids you're looking for" });
            return;
        }
        const validPass = user.checkPassword(req.body.password);
        if(!validPass) {
            res.status(400).json({message: "Couldn't find that account!" });
            return;
        }
        req.session.save(() => {
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;

            res.json({ user, message:"good job, you're now in the matrix!"});
        });
    }catch(err) {
        res.status(404).json({
            message: "Password or Username not found!"
        });
    }
});


