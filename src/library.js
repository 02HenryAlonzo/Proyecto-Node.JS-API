// Importar módulos necesarios de Node.js.
import fs from 'node:fs/promises' // FileSystem para operaciones de archivos.
import path from 'node:path' // Path para manejar rutas de archivos.
import { pool } from './db.js' // Pool de conexiones a la base de datos.

// Función para mostrar la página de inicio.
export const index = async (req, res) => {
  try {
    // Resuelve la ruta al archivo index.html.
    const pathToFile = path.resolve('./public/index.html')
    // Lee el contenido del archivo index.html.
    const html = await fs.readFile(pathToFile, 'utf-8')

    // Enviar el contenido HTML como respuesta.
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(html)
  } catch (error) {
    // Registra en la consola si ocurre un error al leer el archivo.
    console.log('Error al leer el index', error)
  }
}

// Función para obtener y enviar todos los usuarios en formato JSON.
export const obtenerUsuarios = async (req, res) => {
  try {
    // Realizar la consulta SQL para obtener todos los usuarios.
    const [usuarios] = await pool.query('SELECT * FROM usuarios')

    // Enviar los datos de los usuarios como JSON.
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(usuarios))
  } catch (error) {
    // Maneja cualquier error que ocurra durante la consulta o envío de la respuesta.
    console.log('Error al obtener los usuarios', error)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Error interno del servidor' }))
  }
}

// Pre-cargar contenido HTML para respuestas de éxito y error.
const pathToFileExito = path.resolve('./public/exito.html')
const htmlExito = await fs.readFile(pathToFileExito, 'utf-8')

const pathToFileError = path.resolve('./public/error.html')
export const htmlError = await fs.readFile(pathToFileError, 'utf-8')

const pathToFileDup = path.resolve('./public/dup.html')
const htmlDup = await fs.readFile(pathToFileDup, 'utf-8')

// Función para exportar todos los usuarios a un archivo CSV.
export const exportarUsuarios = async (req, res) => {
  try {
    // Consultar la base de datos para obtener todos los usuarios.
    const [filas] = await pool.query('SELECT * FROM usuarios')

    // Crear las cabeceras y filas del archivo CSV.
    const csvEncabezados = 'Id, Nombres, Apellidos, Direccion, Correo, DNI, Edad, Fecha_Creacion, Telefono\n'

    const csvFilas = filas.map(fila => [
      fila.id,
      fila.nombres,
      fila.apellidos,
      fila.direccion,
      fila.correo,
      fila.dni,
      fila.edad,
      fila.fecha_creacion.toISOString().slice(0, 10),
      fila.telefono
    ].join(',')).join('\n')
    const csvDatos = csvEncabezados + csvFilas

    // Escribir los datos en un archivo CSV.
    fs.writeFile('usuarios.csv', csvDatos, (err) => {
      if (err) {
        // Manejar errores al escribir el archivo.
        console.log('Error al crear el archivo CSV', err)
        res.writeHead(500, { 'Content-Type': 'text/html' })
        res.end(htmlError)
      }
    })

    // Envía la respuesta de éxito.
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(htmlExito)
  } catch (error) {
    // Maneja errores durante la exportación de usuarios.
    console.log('Error exportando los usuarios', error)
    res.writeHead(500, { 'Content-Type': 'text/html' })
    res.end(htmlError)
  }
}

// Función para importar usuarios desde un archivo CSV a la base de datos.
export const importarUsuarios = async (req, res) => {
  let todoCorrecto = true

  try {
    // Leer y procesar el archivo CSV.
    const rutaCSV = path.resolve('./usuarios.csv')
    const csv = await fs.readFile(rutaCSV, 'utf-8')
    const csvDatos = csv.split('\n')

    // Remover el encabezado y la última línea si está vacía.
    csvDatos.shift()
    const ultimo = csvDatos[csvDatos.length - 1]
    if (ultimo === '') {
      csvDatos.pop()
    }

    // Iterar sobre cada fila del CSV e insertar en la base de datos.
    for (const fila of csvDatos) {
      const datos = fila.split(',')
      const correo = datos[4]
      const esCorreo = correo.includes('@')
      if (!esCorreo) continue // Saltar filas con correos inválidos.

      const consulta = 'INSERT INTO usuarios(id, nombres, apellidos, direccion, correo, dni, edad, fecha_creacion, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'

      try {
        // Intentar insertar el usuario en la base de datos.
        await pool.execute(consulta, datos)
      } catch (error) {
        // Manejar errores específicos como entradas duplicadas.
        if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
          console.log('Error: Datos duplicados. Los registros ya existen en la base de datos.')
          todoCorrecto = false
          break
        } else {
          // Manejar otros errores.
          console.log('Error al importar usuarios', error)
          todoCorrecto = false
          break
        }
      }
    }

    // Enviar respuesta basada en el éxito o fallo de la operación.
    if (todoCorrecto) {
      console.log('Datos importados correctamente')
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(htmlExito)
    } else {
      // Enviar página de error específico si hubo duplicados.
      res.writeHead(409, { 'Content-Type': 'text/html' })
      res.end(htmlDup)
    }
  } catch (error) {
    // Manejar errores generales durante la importación.
    console.log('Error general al importar usuarios', error)
    res.writeHead(500, { 'Content-Type': 'text/html' })
    res.end(htmlError)
  }
}
