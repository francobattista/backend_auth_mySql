const errors = require('../errors/errors');

module.exports = {
    
    isLoggedIn(req,res,next) //Hechas asi por ser middlewares
    {
        console.log(req);
        console.log(req.isAuthenticated());
        if(req.isAuthenticated())
            return next();
        else
            return next(errors.userAccesDenied);
    },

    isNotLoggedIn(req,res,next)
    {
        if(!req.isAuthenticated())
            return next();
        else
            return next(errors.userAccesDenied);
    }
}