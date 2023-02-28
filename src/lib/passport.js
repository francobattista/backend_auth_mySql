const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('./helpers');
const errors = require('../errors/errors')

passport.use('local.signup', new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password',
    passReqToCallback: true, //Dentro de la func del localstrategy recibo el objeto req.
}, async (req, userName, password, done) => {
    const { fullName } = req.body;
    
    const newUser = {
        userName,
        password,
        fullName
    }
    try {

    newUser.password = await helpers.encryptPassword(password).catch((error) => {
        done(error,false);
    });
    const result = await pool.query('INSERT INTO users set ?', [newUser]);
    newUser.userId = result.insertId;
    return done(null, newUser); //pasa al serialize

    } catch (error) {
        done(error,false);
    }

}))


passport.serializeUser((user,done) => {
    done(null, user.userId)
}) //Interno de passport


passport.deserializeUser(async (id ,done) => {
    const rows = await pool.query('SELECT * FROM users WHERE userId = ?',[id])
    done(null, rows[0])
}) //Interno de passport


passport.use('local.login', new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password',
    passReqToCallback: true, //Dentro de la func del localstrategy recibo el objeto req.
}, async (req, userName, password, done) => {   


    try {
        
        const rows = await pool.query('SELECT * FROM users WHERE userName = ?', [userName])
        
        if(rows.length > 0){
            const user = rows[0];
            const validPassword = await helpers.matchPassword(password, user.password);
            if(validPassword)
                done(null, user, {message: 'Logueo correcto'});
            else
                done(errors.userInvalidPassword, false, { message: 'Contraseña incorrecta' });
        }
        else{
            return done(errors.userNotFound , false, { message : 'Usuario inexistente'});
        }

    } catch (error) {
        done(error,false);
    }



}))
