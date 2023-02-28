const UserInvalidPassword = require('./userInvalidPassword')
const UserNotFound = require('../errors/userNotFoundErr')
const UserAccesDenied = require('./userAccesDenied')
const InvalidParams = require('./invalidParams')

module.exports = {
    userInvalidPassword : new UserInvalidPassword('Contraseña incorrecta'),
    userNotFound : new UserNotFound('Usuario no encontrado'),
    userAccesDenied: new UserAccesDenied('Usuario no autorizado'),
    invalidParams: new InvalidParams('Parametro/s invalido/s')
}