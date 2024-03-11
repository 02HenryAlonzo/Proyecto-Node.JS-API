// Importamos el módulo http para crear un servidor HTTP.
import http from 'node:http'
// Importamos la constante PORT desde un archivo de configuración, que define en que puerto escuchará el servidor.
import { PORT } from './config.js'
// Importamos varias funciones desde un archivo de biblioteca que manejará las diferentes rutas.
import { exportarUsuarios, importarUsuarios, index, obtenerUsuarios, htmlError } from './library.js'

// Creamos el servidor. La función createServer recibe una función de callback que se invoca cada vez que el servidor recibe una solicitud.
const server = http.createServer((req, res) => {
  // Extraemos el método y la URL de la solicitud.
  const { method, url } = req

  // Verificamos si el método de la solicitud es GET
  if (method === 'GET') {
    // Utilizamos una estructura switch para manejar diferentes rutas basadas en la URL.
    switch (url) {
      // Si la URL es '/', llamamos a la función index para manejar la solicitud de la páginade inicio.
      case '/': {
        index(req, res)
        break
      }

      // Si la URL es '/api/usuarios', llamamos a la función obtenerUsuarios para manejar la solicitud de obtener todos los usuarios.
      case '/api/usuarios': {
        obtenerUsuarios(req, res)
        break
      }

      // Si la URL es '/api/usuarios/export', llamamos a la función exportarUsuarios para manejar la solicitud de exportar usuarios.
      case '/api/usuarios/export': {
        exportarUsuarios(req, res)
        break
      }

      // Si la URL es '/api/usuarios/import', llamamos a la función importarUsuarios para manejar la solicitud de importar usuarios.
      case '/api/usuarios/import': {
        importarUsuarios(req, res)
        break
      }

      // Si la URL no coincide con ninguna de las anteriores, respondemos con un código de estado 404 y un mensaje de error.
      default: {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.end(htmlError)
        break
      }
    }
  }
})

// Iniciamos el servidor en el puerto definido en la configuración y registramos un mensaje en la consola.
server.listen(PORT, () => console.log(`Server corriendo en http:localhost:${PORT}`))
