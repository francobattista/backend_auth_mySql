
class InvalidParams extends Error
{
    constructor(message){
        super(message);
        this.name = 'invalidParams';
        this.statusCode = 400;
    }

}

module.exports = InvalidParams;