module.exports = {
  database: {
    host: "localhost",
    user: "root",
    password: "Impresoradev1",
    database: "auth_app_db",
    /*authPlugins:{
            caching_sha2_password: require('./../node_modules/mysql2/lib/auth_plugins/caching_sha2_password') //Lo tengo que hacer, porque al momento de hacer esto estoy teniendo 
            //problemas con las versiones de las autorizaciones, de la forma de cifrar las password. El server me pide el metodo caching... ese que ves ahi,
            //pero mysql2 por defecto trae otro (todavia no se si es porq esta una version vieja pero yo descargue la ultima.) Asi que franco del futuro, si ves 
            //esto, recorda que por ahi ni lo necesites si las versiones son compatibles. En realidad ahora ni se si funciona
        },
        authPluginsEnabled: true
        //Otra explicacion: Lo de arriba no funciono, asi que en el sv de mySQL tuve que cambiar el modo de cifrado-. Bardo
    */
  },
};
