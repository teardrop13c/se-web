-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 07, 2024 at 05:10 PM
-- Server version: 8.0.17
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kusrc_course`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id_course` int(11) NOT NULL,
  `subject_ID` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `subjact_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `credite` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `typeSubject` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='CPET12';

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_phone` varchar(10) NOT NULL,
  `user_comment` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `useravailability`
--

CREATE TABLE `useravailability` (
  `useravailability_id` int(11) NOT NULL,
  `day` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time-start_end` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='วันและวเลาที่ว่างอาจารย์';

-- --------------------------------------------------------

--
-- Table structure for table `user_reg`
--

CREATE TABLE `user_reg` (
  `reg_id` int(10) UNSIGNED NOT NULL COMMENT 'ลำดับการลงทะเบียน',
  `subjectReg_id` varchar(100) NOT NULL COMMENT 'รหัสวิชาที่ลงทะเบียน',
  `lec_num` int(10) UNSIGNED DEFAULT NULL COMMENT 'จำนวนหมู่บรรยาย',
  `lab_num` int(10) UNSIGNED DEFAULT NULL COMMENT 'จำนวนหมู่lab',
  `major_year` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'สาขาที่เปิด',
  `roomReg_ranking` varchar(100) DEFAULT NULL COMMENT 'อันดับห้อง',
  `student_year` varchar(100) NOT NULL,
  `user_email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='userลงทะเบียนหรืออาจารย์ลงทะเบียน';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id_course`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_email`);

--
-- Indexes for table `useravailability`
--
ALTER TABLE `useravailability`
  ADD PRIMARY KEY (`useravailability_id`),
  ADD KEY `user_email` (`user_email`);

--
-- Indexes for table `user_reg`
--
ALTER TABLE `user_reg`
  ADD PRIMARY KEY (`reg_id`),
  ADD KEY `user_email` (`user_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id_course` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `useravailability`
--
ALTER TABLE `useravailability`
  MODIFY `useravailability_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_reg`
--
ALTER TABLE `user_reg`
  MODIFY `reg_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ลำดับการลงทะเบียน', AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `useravailability`
--
ALTER TABLE `useravailability`
  ADD CONSTRAINT `useravailability_ibfk_1` FOREIGN KEY (`user_email`) REFERENCES `user` (`user_email`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `user_reg`
--
ALTER TABLE `user_reg`
  ADD CONSTRAINT `user_reg_ibfk_1` FOREIGN KEY (`user_email`) REFERENCES `user` (`user_email`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
