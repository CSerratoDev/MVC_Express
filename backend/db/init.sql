SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

DROP TABLE IF EXISTS `admin`;
DROP TABLE IF EXISTS `user`;

CREATE TABLE IF NOT EXISTS `admin` (
  `userId` int(11) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `admin` (`userId`, `email`, `password`) VALUES
(1, 'admin@gmail.com', '12345678');

CREATE TABLE IF NOT EXISTS `user` (
  `userId` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `phoneNumber` varchar(15) NOT NULL,
  `email` varchar(60) NOT NULL,
  `address` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `user` (`userId`, `name`, `lastName`, `phoneNumber`, `email`, `address`) VALUES
(1, 'Alexis', 'Serrato', '5521240231', 'cserrato.dev@gmail.com', 'Juriquilla, Querétaro');
--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`userId`);

ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`);

ALTER TABLE `admin`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;
