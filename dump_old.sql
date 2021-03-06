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
  `idalumnosCursada` int NOT NULL AUTO_INCREMENT,
  `datosAlumno` json DEFAULT NULL,
  `notaCursada` int DEFAULT NULL,
  `Materias_idMaterias` int NOT NULL,
  `Materias_Carreras_idCarreras` int NOT NULL,
  `recordatorio` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idalumnosCursada`,`Materias_idMaterias`,`Materias_Carreras_idCarreras`),
  KEY `Materias_idMaterias` (`Materias_idMaterias`),
  KEY `Materias_Carreras_idCarreras` (`Materias_Carreras_idCarreras`),
  CONSTRAINT `alumnoscursada_ibfk_1` FOREIGN KEY (`Materias_idMaterias`) REFERENCES `materias` (`idMaterias`),
  CONSTRAINT `alumnoscursada_ibfk_2` FOREIGN KEY (`Materias_Carreras_idCarreras`) REFERENCES `materias` (`Carreras_idCarreras`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnoscursada`
--

LOCK TABLES `alumnoscursada` WRITE;
/*!40000 ALTER TABLE `alumnoscursada` DISABLE KEYS */;
INSERT INTO `alumnoscursada` VALUES (1,'{\"id\": 1, \"dni\": null, \"email\": \"maximiliano.pizarro.5@gmail.com\", \"nombre\": \"maximiliano\", \"apellido\": \"pizarro\", \"telefono\": \"1167692039\", \"domicilio\": \"ituzaingo 3168\"}',NULL,1,1,1,'2020-10-03 23:27:24','2020-10-03 23:27:24'),(3,'{\"id\": 1, \"dni\": null, \"email\": \"maximiliano.pizarro.5@gmail.com\", \"nombre\": \"maximiliano\", \"apellido\": \"pizarro\", \"telefono\": \"1167692039\", \"domicilio\": \"ituzaingo 3168\"}',NULL,1,1,1,'2020-10-03 23:56:03','2020-10-03 23:56:03'),(4,'{\"id\": 1, \"dni\": null, \"email\": \"maximiliano.pizarro.5@gmail.com\", \"nombre\": \"maximiliano\", \"apellido\": \"pizarro\", \"telefono\": \"1167692039\", \"domicilio\": \"ituzaingo 3168\"}',NULL,1,1,1,'2020-10-03 23:56:36','2020-10-03 23:56:36'),(5,'{\"id\": 1, \"dni\": null, \"email\": \"maximiliano.pizarro.5@gmail.com\", \"nombre\": \"maximiliano\", \"apellido\": \"pizarro\", \"telefono\": \"1167692039\", \"domicilio\": \"ituzaingo 3168\"}',NULL,1,1,1,'2020-10-04 00:07:35','2020-10-04 00:07:35');
/*!40000 ALTER TABLE `alumnoscursada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumnosexamenfinal`
--

DROP TABLE IF EXISTS `alumnosexamenfinal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnosexamenfinal` (
  `idInscriptosExamen` int NOT NULL AUTO_INCREMENT,
  `Examenes_idExamenes` int NOT NULL,
  `Examenes_Materias_idMaterias` int NOT NULL,
  `Examenes_Materias_Carreras_idCarreras` int NOT NULL,
  `datosAlumno` json DEFAULT NULL,
  `nota` int DEFAULT NULL,
  `asistencia` tinyint(1) DEFAULT NULL,
  `recordatorio` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idInscriptosExamen`),
  KEY `Examenes_idExamenes` (`Examenes_idExamenes`),
  KEY `Examenes_Materias_idMaterias` (`Examenes_Materias_idMaterias`),
  KEY `Examenes_Materias_Carreras_idCarreras` (`Examenes_Materias_Carreras_idCarreras`),
  CONSTRAINT `alumnosexamenfinal_ibfk_1` FOREIGN KEY (`Examenes_idExamenes`) REFERENCES `examenes` (`idExamenes`),
  CONSTRAINT `alumnosexamenfinal_ibfk_2` FOREIGN KEY (`Examenes_Materias_idMaterias`) REFERENCES `examenes` (`Materias_idMaterias`),
  CONSTRAINT `alumnosexamenfinal_ibfk_3` FOREIGN KEY (`Examenes_Materias_Carreras_idCarreras`) REFERENCES `examenes` (`Materias_Carreras_idCarreras`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnosexamenfinal`
--

LOCK TABLES `alumnosexamenfinal` WRITE;
/*!40000 ALTER TABLE `alumnosexamenfinal` DISABLE KEYS */;
INSERT INTO `alumnosexamenfinal` VALUES (1,1,1,1,'{\"id\": 1, \"dni\": null, \"email\": \"maximiliano.pizarro.5@gmail.com\", \"nombre\": \"maximiliano\", \"apellido\": \"pizarro\", \"telefono\": \"1167692039\", \"domicilio\": \"ituzaingo 3168\"}',NULL,NULL,1,'2020-10-04 01:38:44','2020-10-04 01:38:44');
/*!40000 ALTER TABLE `alumnosexamenfinal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carreras`
--

DROP TABLE IF EXISTS `carreras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carreras` (
  `idCarreras` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `departamento` varchar(45) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idCarreras`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carreras`
--

LOCK TABLES `carreras` WRITE;
/*!40000 ALTER TABLE `carreras` DISABLE KEYS */;
INSERT INTO `carreras` VALUES (1,'Distribuidos','Tenologia','2011-12-18 13:17:17','2011-12-18 13:17:17');
/*!40000 ALTER TABLE `carreras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curso`
--

DROP TABLE IF EXISTS `curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curso` (
  `idCurso` int NOT NULL AUTO_INCREMENT,
  `datosDocente` json DEFAULT NULL,
  `Materias_idMaterias` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idCurso`,`Materias_idMaterias`),
  KEY `Materias_idMaterias` (`Materias_idMaterias`),
  CONSTRAINT `curso_ibfk_1` FOREIGN KEY (`Materias_idMaterias`) REFERENCES `materias` (`idMaterias`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` VALUES (1,'{}',1,'2011-12-18 13:17:17','2011-12-18 13:17:17');
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examenes`
--

DROP TABLE IF EXISTS `examenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examenes` (
  `idExamenes` int NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `horarioInicio` time DEFAULT NULL,
  `horarioFin` time DEFAULT NULL,
  `docenteAsignado` json DEFAULT NULL,
  `inicioInscripcion` date DEFAULT NULL,
  `finInscripcion` date DEFAULT NULL,
  `Materias_idMaterias` int NOT NULL,
  `Materias_Carreras_idCarreras` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idExamenes`,`Materias_idMaterias`,`Materias_Carreras_idCarreras`),
  KEY `Materias_idMaterias` (`Materias_idMaterias`),
  KEY `Materias_Carreras_idCarreras` (`Materias_Carreras_idCarreras`),
  CONSTRAINT `examenes_ibfk_1` FOREIGN KEY (`Materias_idMaterias`) REFERENCES `materias` (`idMaterias`),
  CONSTRAINT `examenes_ibfk_2` FOREIGN KEY (`Materias_Carreras_idCarreras`) REFERENCES `materias` (`Carreras_idCarreras`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examenes`
--

LOCK TABLES `examenes` WRITE;
/*!40000 ALTER TABLE `examenes` DISABLE KEYS */;
INSERT INTO `examenes` VALUES (1,'2020-10-04','11:00:00','12:00:00','\"{\'id\'=1;\'nombre\'=\'juan\';\'apellido\'=\'Perez\'}\"','2020-10-04','2020-10-09',1,1,'2020-10-05 00:00:54','2020-10-05 02:11:32'),(2,'2020-10-04','10:00:00',NULL,'\"{\'id\'=1;\'nombre\'=\'juan\';\'apellido\'=\'Perez\'}\"','2020-10-04',NULL,1,1,'2020-10-05 02:10:14','2020-10-05 02:10:14'),(3,'2020-10-04','10:00:00',NULL,'\"{\'id\'=1;\'nombre\'=\'juan\';\'apellido\'=\'Perez\'}\"','2020-10-04',NULL,1,1,'2020-10-05 02:39:25','2020-10-05 02:39:25');
/*!40000 ALTER TABLE `examenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horario`
--

DROP TABLE IF EXISTS `horario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horario` (
  `idHorario` int NOT NULL AUTO_INCREMENT,
  `dia` varchar(10) NOT NULL,
  `horarioInicio` time NOT NULL,
  `horarioFin` time NOT NULL,
  `Curso_idCurso` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idHorario`,`Curso_idCurso`),
  KEY `Curso_idCurso` (`Curso_idCurso`),
  CONSTRAINT `horario_ibfk_1` FOREIGN KEY (`Curso_idCurso`) REFERENCES `curso` (`idCurso`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horario`
--

LOCK TABLES `horario` WRITE;
/*!40000 ALTER TABLE `horario` DISABLE KEYS */;
INSERT INTO `horario` VALUES (2,'Jueves','11:00:00','12:00:00',1,'2020-10-05 02:31:04','2020-10-05 02:31:04');
/*!40000 ALTER TABLE `horario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materias`
--

DROP TABLE IF EXISTS `materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materias` (
  `idMaterias` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `inicioInscripcion` date DEFAULT NULL,
  `finInscripcion` date DEFAULT NULL,
  `Carreras_idCarreras` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idMaterias`,`Carreras_idCarreras`),
  KEY `Carreras_idCarreras` (`Carreras_idCarreras`),
  CONSTRAINT `materias_ibfk_1` FOREIGN KEY (`Carreras_idCarreras`) REFERENCES `carreras` (`idCarreras`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materias`
--

LOCK TABLES `materias` WRITE;
/*!40000 ALTER TABLE `materias` DISABLE KEYS */;
INSERT INTO `materias` VALUES (1,'Aspectos legales','2020-04-10','2020-01-10',1,'2020-10-05 00:00:54','2020-10-05 00:37:21'),(2,'Distribuidos',NULL,'2020-01-10',1,'2020-10-05 00:00:54','2020-10-05 02:57:02'),(4,'Ingles',NULL,'2020-01-10',1,'2020-10-05 02:57:53','2020-10-05 02:57:53'),(5,'Ingles','2020-01-10','2020-01-10',1,'2020-10-05 02:59:10','2020-10-05 02:59:10');
/*!40000 ALTER TABLE `materias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'inscripciones'
--

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

-- Dump completed on 2020-10-05  0:01:10
