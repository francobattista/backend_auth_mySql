
class UserAccesDenied extends Error
{
    constructor(message){
        super(message);
        this.name = 'accesDenied';
        this.statusCode = 401;
    }

}

module.exports = UserAccesDenied;