-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-03-2024 a las 03:31:52
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_usuarios`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombres` varchar(200) NOT NULL,
  `apellidos` varchar(200) NOT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `correo` varchar(200) NOT NULL,
  `dni` varchar(200) NOT NULL,
  `edad` int(11) DEFAULT NULL,
  `fecha_creacion` date NOT NULL,
  `telefono` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombres`, `apellidos`, `direccion`, `correo`, `dni`, `edad`, `fecha_creacion`, `telefono`) VALUES
(1, 'Juan', 'Perez', 'Calle Falsa 123', 'juan.perez@mail.com', '12345678A', 28, '2023-03-01', '600111222'),
(2, 'Ana', 'Gomez', 'Avenida Real 456', 'ana.gomez@mail.com', '87654321B', 34, '2023-03-02', '601222333'),
(3, 'Carlos', 'Ruiz', 'Calle Nueva 789', 'carlos.ruiz@mail.com', '23456789C', 45, '2023-03-03', '602333444'),
(4, 'Lucia', 'Díaz', 'Plaza Central 101', 'lucia.diaz@mail.com', '34567890D', 26, '2023-03-04', '603444555'),
(5, 'Marco', 'Fernandez', 'Avenida Libertad 202', 'marco.fernandez@mail.com', '45678901E', 33, '2023-03-05', '604555666'),
(6, 'Sofia', 'Castillo', 'Calle Sol 303', 'sofia.castillo@mail.com', '56789012F', 29, '2023-03-06', '605666777'),
(7, 'David', 'López', 'Avenida Luna 404', 'david.lopez@mail.com', '67890123G', 40, '2023-03-07', '606777888'),
(8, 'Natalia', 'Morales', 'Calle Estrella 505', 'natalia.morales@mail.com', '78901234H', 37, '2023-03-08', '607888999'),
(9, 'Oscar', 'Jimenez', 'Avenida Sol 123', 'oscar.jimenez@mail.com', '89012345I', 22, '2023-03-09', '608999000'),
(10, 'Patricia', 'Navarro', 'Calle Luna 456', 'patricia.navarro@mail.com', '90123456J', 31, '2023-03-10', '609000111'),
(11, 'Roberto', 'Garcia', 'Avenida Estrella 789', 'roberto.garcia@mail.com', '01234567K', 25, '2023-03-11', '610111222'),
(12, 'Sandra', 'Sánchez', 'Calle Río 101', 'sandra.sanchez@mail.com', '12345678L', 38, '2023-03-12', '611222333'),
(13, 'Tomás', 'Martínez', 'Avenida Bosque 202', 'tomas.martinez@mail.com', '23456789M', 42, '2023-03-13', '612333444'),
(14, 'Ursula', 'Vega', 'Calle Mar 303', 'ursula.vega@mail.com', '34567890N', 27, '2023-03-14', '613444555'),
(15, 'Victor', 'Blanco', 'Avenida Jardín 404', 'victor.blanco@mail.com', '45678901O', 36, '2023-03-15', '614555666'),
(16, 'Ximena', 'Torres', 'Calle Bosque 505', 'ximena.torres@mail.com', '56789012P', 39, '2023-03-16', '615666777'),
(17, 'Yolanda', 'Ruiz', 'Avenida Río 606', 'yolanda.ruiz@mail.com', '67890123Q', 44, '2023-03-17', '616777888'),
(18, 'Zacarias', 'Mendez', 'Calle Jardín 707', 'zacarias.mendez@mail.com', '78901234R', 30, '2023-03-18', '617888999'),
(19, 'Alejandro', 'Nieto', 'Avenida Mar 123', 'alejandro.nieto@mail.com', '89012345S', 23, '2023-03-19', '618999000'),
(20, 'Beatriz', 'Campos', 'Calle Sol 456', 'beatriz.campos@mail.com', '90123456T', 48, '2023-03-20', '619000111');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD UNIQUE KEY `dni` (`dni`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
