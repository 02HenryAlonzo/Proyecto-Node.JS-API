// Importa el módulo dotenv, que ayuda a cargar variables de entorno desde un archivo .env.
import dotenv from 'dotenv'

// Carga las variables de entorno del archivo .env al objeto process.env.
dotenv.config()

// Exporta la dirección del host de la base de datos, usando la variable de entorno DB_HOST.
export const DB_HOST = process.env.DB_HOST || 'localhost'
// Exporta el usuario de la base de datos, utilizando la variable de entorno DB_USER.
export const DB_USER = process.env.DB_USER || 'root'
// Exporta la contraseña de la base de datos, utilizando la variable de entorno DB_PASSWORD.
export const DB_PASSWORD = process.env.DB_PASSWORD || ''
// Exporta el nombre de la base de datos, usando la variable de entorno DB_DATABASE.
export const DB_DATABASE = process.env.DB_DATABASE || 'db_usuarios'
// Exporta el puerto en el cual el servidor debe escuchar, utilizando la variable de entorno PORT.
export const PORT = process.env.PORT || 3000
