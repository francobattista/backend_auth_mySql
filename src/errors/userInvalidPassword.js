
class UserInvalidPassword extends Error
{
    constructor(message){
        super(message);
        this.name = 'invalidPassword';
        this.statusCode = 401;
    }

}

module.exports = UserInvalidPassword;