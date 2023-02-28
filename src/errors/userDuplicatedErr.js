
class UsuarioNoEncontradoError extends Error
{
    constructor(message){
        super(message);
        this.name = 'userDuplicated';
        this.statusCode = 404;
    }

}