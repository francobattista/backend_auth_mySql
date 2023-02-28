const express = require("express");
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const { database } = require("./keys");
const cors = require('cors')
const app = express();
require('./lib/passport'); //Esto trae el codigo que cree para aca, asi passaport sabe

//SETTINGS -> configuraciones de expres

app.set('port',process.env.PORT || 4000);

//MIDDLEWARES
//TODO ->  BUENA ACLARACION -> LOS MIDDLEWARES PARA MANEJO DE ERRORES SE LES PASA err, y los otros 3

app.use(session({
    secret: 'clavesinha',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database) //las sesiones se almacenan en la base de datos. oJO QUE SI NO CREO LA TABLA, ME LA CREA AUTOMATICAMENTE Y NO ES BUENO. Pero para esto ya foe
  })); //Quizas podria configurarla un toque mejor, asi crudo me lo almacena en una tabla "sessions"


  app.use(morgan('dev')); //Middleware de morgan para que me muestre como llegan las reqs
  app.use(express.urlencoded({extended:false})) //No usa imagenes y eso
    app.use(express.json());
    app.use(passport.initialize()); //Inicio passport
    app.use(passport.session()) //Guarda los datos en una sesion
    app.use(cors({origin:'http://localhost:3000', credentials:true}));

//Global

app.use((req,res,next)=>{
    console.log(req.body);
    next();

})



//Routes

app.use(require('./routes')) //TODO-> Aca agarra el index js, y como esta en export me agarra el router.
app.use(require('./routes/authentication')) //TODO-> Aca agarra el index js, y como esta en export me agarra el router.
app.use('/links',require('./routes/links')) //TODO-> Aca agarra el index js, y como esta en export me agarra el router.

//Public



//Error handler

app.use((err, req, res, next) => {
    if(err.statusCode) //Error personalizado
        res.status(err.statusCode).send({errorMessage: err.message});
    else
        res.status(400).send({errorMessage: err.message})
    
})


//Starting the server


app.listen(app.get('port'), () => {
    console.log(`Server listening at port ${app.get('port')}`);
})