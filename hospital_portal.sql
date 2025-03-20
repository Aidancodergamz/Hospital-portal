-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 20, 2025 at 10:08 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital_portal`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `dob` date NOT NULL DEFAULT '2000-01-01',
  `department` enum('Cardiology','Neurology','Orthopedics','Pediatrics','General Surgery','Emergency','Radiology') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `surname`, `email`, `password`, `username`, `dob`, `department`) VALUES
(40, 'Aidan', 'O\'Rourke', 'aidanorourke@hotmail.co.uk', '$2b$10$ZX3OXt/kUT8dAApFYY.TruQzsh1dQ46laALkob9rdFolEL0Z45Cjq', 'User', '1992-06-06', 'General Surgery'),
(42, 'Iram', 'Rafique', 'test2@gmail.com', '$2b$10$ZJfuyMY6P31yBpysf8TGO.XOxrgS97fhicWPBoez2Njhe/YCTctJy', 'test2', '2018-09-09', 'Cardiology'),
(43, 'juana', 'lopez', 'juanalopez@hotmaill.xpxmx', '$2b$10$X/GccdecSSWQ1i9uAdqhn.5YmMt0o6KMn9D0nMdt0zITG.IJiaXYG', 'juana', '1974-03-23', 'Pediatrics');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
