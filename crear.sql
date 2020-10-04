-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: inscripciones
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alumnoscursada`
--

DROP TABLE IF EXISTS `alumnoscursada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnoscursada` (
  `idalumnosCursada` binary(16) NOT NULL AUTO_INCREMENT,
  `datosAlumno` json DEFAULT NULL,
  `notaCursada` tinyint DEFAULT NULL,
  `Materias_idMaterias` int NOT NULL,
  `Materias_Carreras_idCarreras` int NOT NULL,
  `recordatorio` bit(1) DEFAULT b'0',
  PRIMARY KEY (`idalumnosCursada`,`Materias_idMaterias`,`Materias_Carreras_idCarreras`),
  KEY `fk_alumnosCursada_Materias1_idx` (`Materias_idMaterias`,`Materias_Carreras_idCarreras`),
  CONSTRAINT `fk_alumnosCursada_Materias1` FOREIGN KEY (`Materias_idMaterias`, `Materias_Carreras_idCarreras`) REFERENCES `materias` (`idMaterias`, `Carreras_idCarreras`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnoscursada`
--

LOCK TABLES `alumnoscursada` WRITE;
/*!40000 ALTER TABLE `alumnoscursada` DISABLE KEYS */;
INSERT INTO `alumnoscursada` VALUES (2,'{\"id\": 1, \"dni\": \"36771843\", \"email\": \"maximiliano.pizarro@gmail.com\", \"nombre\": \"Maximiliano\", \"apellido\": \"Pizarro\", \"telefono\": \"1167692039\", \"domicilio\": \"ituzaingo 3168\"}',1,1,1,_binary '');
/*!40000 ALTER TABLE `alumnoscursada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumnosexamenfinal`
--

DROP TABLE IF EXISTS `alumnosexamenfinal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnosexamenfinal` (
  `idInscriptosExamen` int NOT NULL,
  `Examenes_idExamenes` int NOT NULL,
  `Examenes_Materias_idMaterias` int NOT NULL,
  `Examenes_Materias_Carreras_idCarreras` int NOT NULL,
  `datosAlumno` json DEFAULT NULL,
  `nota` tinyint DEFAULT NULL,
  `asistencia` bit(1) DEFAULT NULL,
  `recordatorio` bit(1) DEFAULT b'0',
  PRIMARY KEY (`idInscriptosExamen`),
  KEY `fk_InscriptosExamen_Examenes1_idx` (`Examenes_idExamenes`,`Examenes_Materias_idMaterias`,`Examenes_Materias_Carreras_idCarreras`),
  CONSTRAINT `fk_InscriptosExamen_Examenes1` FOREIGN KEY (`Examenes_idExamenes`, `Examenes_Materias_idMaterias`, `Examenes_Materias_Carreras_idCarreras`) REFERENCES `examenes` (`idExamenes`, `Materias_idMaterias`, `Materias_Carreras_idCarreras`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnosexamenfinal`
--

LOCK TABLES `alumnosexamenfinal` WRITE;
/*!40000 ALTER TABLE `alumnosexamenfinal` DISABLE KEYS */;
INSERT INTO `alumnosexamenfinal` VALUES (1,1,1,1,'{\"id\": 1, \"dni\": \"36771843\", \"email\": \"maximiliano.pizarro@gmail.com\", \"nombre\": \"Maximiliano\", \"apellido\": \"Pizarro\", \"telefono\": \"1167692039\", \"domicilio\": \"ituzaingo 3168\"}',10,_binary '',_binary '');
/*!40000 ALTER TABLE `alumnosexamenfinal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carreras`
--

DROP TABLE IF EXISTS `carreras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carreras` (
  `idCarreras` int NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `departamento` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idCarreras`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carreras`
--

LOCK TABLES `carreras` WRITE;
/*!40000 ALTER TABLE `carreras` DISABLE KEYS */;
INSERT INTO `carreras` VALUES (1,'Lic. sistemas','Tecnologia');
/*!40000 ALTER TABLE `carreras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curso`
--

DROP TABLE IF EXISTS `curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curso` (
  `idCurso` int NOT NULL,
  `datosDocente` json DEFAULT NULL,
  `Materias_idMaterias` int NOT NULL,
  PRIMARY KEY (`idCurso`,`Materias_idMaterias`),
  KEY `fk_Curso_Materias1_idx` (`Materias_idMaterias`),
  CONSTRAINT `fk_Curso_Materias1` FOREIGN KEY (`Materias_idMaterias`) REFERENCES `materias` (`idMaterias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` VALUES (1,'{\"id\": 1, \"dni\": \"222222\", \"email\": \"docente@gmail.com\", \"nombre\": \"Pepe\", \"apellido\": \"Sand\", \"telefono\": \"11122039\", \"domicilio\": \"salta 103\"}',1),(2,'{\"id\": 2, \"dni\": \"222222\", \"email\": \"docente2@gmail.com\", \"nombre\": \"Nicolas\", \"apellido\": \"Goday\", \"telefono\": \"11122039\", \"domicilio\": \"salta 103\"}',4),(3,'{\"id\": 2, \"dni\": \"222222\", \"email\": \"docente2@gmail.com\", \"nombre\": \"Jose\", \"apellido\": \"Juan\", \"telefono\": \"11122039\", \"domicilio\": \"salta 103\"}',2),(4,'{\"id\": 3, \"dni\": \"222222\", \"email\": \"docente3@gmail.com\", \"nombre\": \"Nicolas\", \"apellido\": \"Roday\", \"telefono\": \"11122039\", \"domicilio\": \"salta 103\"}',3);
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examenes`
--

DROP TABLE IF EXISTS `examenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examenes` (
  `idExamenes` int NOT NULL,
  `fecha` date DEFAULT NULL,
  `horarioInicio` time DEFAULT NULL,
  `horarioFin` time DEFAULT NULL,
  `docenteAsignado` json DEFAULT NULL,
  `inicioInscripcion` date DEFAULT NULL,
  `finInscripcion` varchar(45) DEFAULT NULL,
  `Materias_idMaterias` int NOT NULL,
  `Materias_Carreras_idCarreras` int NOT NULL,
  PRIMARY KEY (`idExamenes`,`Materias_idMaterias`,`Materias_Carreras_idCarreras`),
  KEY `fk_Examenes_Materias1_idx` (`Materias_idMaterias`,`Materias_Carreras_idCarreras`),
  CONSTRAINT `fk_Examenes_Materias1` FOREIGN KEY (`Materias_idMaterias`, `Materias_Carreras_idCarreras`) REFERENCES `materias` (`idMaterias`, `Carreras_idCarreras`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examenes`
--

LOCK TABLES `examenes` WRITE;
/*!40000 ALTER TABLE `examenes` DISABLE KEYS */;
INSERT INTO `examenes` VALUES (1,'2020-09-30','10:00:00','16:00:00','{\"id\": 1, \"dni\": \"222222\", \"email\": \"docente@gmail.com\", \"nombre\": \"Pepe\", \"apellido\": \"Sand\", \"telefono\": \"11122039\", \"domicilio\": \"salta 103\"}','2020-09-16','2020-9-20',1,1);
/*!40000 ALTER TABLE `examenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horario`
--

DROP TABLE IF EXISTS `horario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horario` (
  `idHorario` int NOT NULL,
  `dia` varchar(10) NOT NULL,
  `horarioInicio` time NOT NULL,
  `horarioFin` time NOT NULL,
  `Curso_idCurso` int NOT NULL,
  PRIMARY KEY (`idHorario`,`Curso_idCurso`),
  KEY `fk_Horario_Curso_idx` (`Curso_idCurso`),
  CONSTRAINT `fk_Horario_Curso` FOREIGN KEY (`Curso_idCurso`) REFERENCES `curso` (`idCurso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horario`
--

LOCK TABLES `horario` WRITE;
/*!40000 ALTER TABLE `horario` DISABLE KEYS */;
INSERT INTO `horario` VALUES (1,'LUNES','10:00:00','12:00:00',1),(2,'MARTES','10:00:00','12:00:00',1),(3,'JUEVES','08:00:00','12:00:00',2),(4,'VIERNES','10:40:00','12:00:00',3);
/*!40000 ALTER TABLE `horario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materias`
--

DROP TABLE IF EXISTS `materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materias` (
  `idMaterias` int NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `idCarrera` int DEFAULT NULL,
  `Materiascol` varchar(45) DEFAULT NULL,
  `inicioInscripcion` date DEFAULT NULL,
  `finInscripcion` date DEFAULT NULL,
  `Carreras_idCarreras` int NOT NULL,
  PRIMARY KEY (`idMaterias`,`Carreras_idCarreras`),
  KEY `fk_Materias_Carreras1_idx` (`Carreras_idCarreras`),
  CONSTRAINT `fk_Materias_Carreras1` FOREIGN KEY (`Carreras_idCarreras`) REFERENCES `carreras` (`idCarreras`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materias`
--

LOCK TABLES `materias` WRITE;
/*!40000 ALTER TABLE `materias` DISABLE KEYS */;
INSERT INTO `materias` VALUES (1,'Matematica',1,'no se que es','2013-09-23','2013-09-23',1),(2,'Sistemas distribuidos',1,'materia','2020-09-23','2020-09-23',1),(3,'IOT',1,NULL,'2013-09-23','2013-09-23',1),(4,'Algoritmos 1',1,NULL,'2013-09-23','2013-09-23',1);
/*!40000 ALTER TABLE `materias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'inscripciones'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-28 21:50:56
