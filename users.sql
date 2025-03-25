-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2025 at 09:14 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

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
  `department` enum('X-Ray','MRI','Clinics','Wards','Play Areas','Surgical Theatres','Children''s Wing') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `surname`, `email`, `password`, `username`, `dob`, `department`) VALUES
(47, 'Aidan', 'O\'Rourke', 'aidanorourke@hotmail.co.uk', '$2b$10$HeIvRyqH0CyIr/P69PhCSuXWAxNNeTHgmPzKUkrYJ8rzqUFUJft4a', 'User', '1992-06-06', 'X-Ray'),
(48, 'Jesse', 'Pinkman', 'kiddo@hotmail.com', '$2b$10$SmF2CX47x.Q/yHVTkwWGquB/2uIeNFVKAVopLCoDT.G3FrmSawqcO', 'KidUser', '2017-05-01', 'Children\'s Wing'),
(50, 'julieta', 'Rodriguez', 'julieta@hotmail.co.uk', '$2b$10$ng/SsIZKIVorxkvdBF4k5uBz6DPGf0mLH5KYqPb9KVzh0gCg3IRKy', 'julieta', '1974-03-23', 'Clinics'),
(51, 'James', 'McAvoy', 'Jamieboy@gmail.com', '$2b$10$orKSz5p6ffwGMQIY8.y.GelbKq7stlenfXCzja70ymMrNjnYET7xm', 'NewKid', '2015-04-25', 'Children\'s Wing');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
