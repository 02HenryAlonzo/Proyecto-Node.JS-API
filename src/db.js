// Importa el módulo mysql2, específicamente la funcionalidad que soporta promesas, para trabajar con MySQL.
import mysql2 from 'mysql2/promise'
// Importa las constantes necesarias desde el archivo de configuración.
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } from './config.js'

// Crea y exporta un pool de conexiones a la base de datos.
// Un pool de conexiones permite gestionar un conjunto de conexiones a la base de datos,
// reutilizando y administrando las conexiones de forma eficiente.
export const pool = mysql2.createPool({
  host: DB_HOST, // Dirección del servidor de la base de datos.
  user: DB_USER, // Nombre de usuario para acceder a la base de datos.
  password: DB_PASSWORD, // Contraseña del usuario para acceder a la base de datos.
  database: DB_DATABASE // Nombre de la base de datos a la cual conectarse.
})
