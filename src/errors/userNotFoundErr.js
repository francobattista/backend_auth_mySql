

class UserNotFoundError extends Error {

    constructor(message){
        super(message);
        this.name = 'userNotFound';
        this.statusCode = 404;
    }
    
}

module.exports = UserNotFoundError;