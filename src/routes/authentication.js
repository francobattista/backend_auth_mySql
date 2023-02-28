const express = require("express");
const router = express.Router();
const passport = require("passport");
const errors = require("../errors/errors");
const { isLoggedIn, isNotLoggedIn } = require("../lib/auth");

router.post("/signup", isNotLoggedIn, (req, res, next) => {
  const { userName, password, fullName } = req.body;
  if (!userName || !password || !fullName) return next(errors.invalidParams);

  passport.authenticate("local.signup", (err, user, info) => {
    if (err) return next(err);
    req.logIn(user, (err) => {
      //Como uso un callback por mi cuenta, para llamar al serialize y el desserialize lo tengo que manejar yo de esta forma
      if (err) return next(err);
      return res.status(200).send({message:"Usuario registrado correctamente"});
    });
  })(req, res, next);
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  const { userName, password } = req.body;

  if (!userName || !password) return next(errors.invalidParams);

  passport.authenticate("local.login", (err, user, info) => {
    if (err) return next(err);
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).send({message:"Usuario logueado correctamente"});
    });
  })(req, res, next);
});

router.post("/logout", isLoggedIn, (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    return res.status(200).send({message:"Usuario deslogueado correctamente"});
  }); //METODO DE PASSPORT
});


router.post('/isauthorized', isLoggedIn, (req,res,next) => {
  res.status(200).send({message: "Authorizado"})
})


module.exports = router;
