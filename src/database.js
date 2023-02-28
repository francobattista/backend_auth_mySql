const mysql = require("mysql2");
const { database } = require("./keys");
const { promisify } = require("util");

const pool = mysql.createPool(database); //Hilo que se ejecuta a la ves en secuencia

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST")
      console.error("CONEXION CERRADA");
    if (err.code === "E_CON_COUNT_ERROR") console.error("2");
    if (err.code === "ECONNREFUSED") console.error("3");
  }

  if (connection) connection.release(); //Empieza la conexion
  console.log("DB CONNECTED");
  return;
});

pool.query = promisify(pool.query); //mysql no soporta promesas, solo cb. Con esto las convierto en promesas.

module.exports = pool;
