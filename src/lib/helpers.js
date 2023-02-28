const bcrypt = require('bcryptjs')

const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // Aleatoriedad
    const hash = await bcrypt.hash(password, salt)
    return hash;
}

helpers.decryptPassword = () => {
    
}

helpers.matchPassword = async (password, passwordSaved) => {
    try{
        return await bcrypt.compare(password, passwordSaved);
    }
    catch(e){
        console.log(e);
    }
}


module.exports = helpers;