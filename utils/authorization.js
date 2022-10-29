
//TODO: if user isnt logged in return to the login page
const withAuthorization = (req, res, next) => {
    if(!req.session.userId){
        res.redirect("/login");
    }else{
        next();
    }
};

module.exports = withAuthorization;