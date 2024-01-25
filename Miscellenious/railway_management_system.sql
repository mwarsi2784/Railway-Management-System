SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_name VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);



CREATE TABLE IF NOT EXISTS `class` (
  `cname` varchar(10) NOT NULL,
  PRIMARY KEY (`cname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




CREATE TABLE IF NOT EXISTS `classseats` (
  `trainno` int(11) NOT NULL,
  `doj` date NOT NULL,
  `class` varchar(10) NOT NULL,
  `fare` int(11) NOT NULL,
  `seatsleft` int(11) NOT NULL,
  PRIMARY KEY (`trainno`,`doj`,`class`),
  KEY `class` (`class`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




DROP TRIGGER IF EXISTS `before_insert_on_classseats`;
DELIMITER //
CREATE TRIGGER `before_insert_on_classseats` BEFORE INSERT ON `classseats`
 FOR EACH ROW begin
if datediff(curdate(),new.doj)>0 then
SIGNAL SQLSTATE '45000' 
SET MESSAGE_TEXT = 'Check date!!!';
end if;
if new.fare<=0 then 
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Check fare!!!';
end if;
if new.seatsleft<=0 then 
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Check seats!!!';
end if;
end
//
DELIMITER ;
DROP TRIGGER IF EXISTS `before_update_on_classseats`;
DELIMITER //
CREATE TRIGGER `before_update_on_classseats` BEFORE UPDATE ON `classseats`
 FOR EACH ROW begin
if datediff(curdate(),new.doj)>0 then
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'check date!!!';
end if;
if new.fare<=0 then 
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Check fare!!!';
end if;
if new.seatsleft<=0 then 
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Check seats!!!';
end if;
end
//
DELIMITER ;

-- --------------------------------------------------------


CREATE TABLE IF NOT EXISTS `pd` (
  `pnr` int(11) NOT NULL,
  `pname` varchar(50) NOT NULL,
  `page` int(11) NOT NULL,
  `pgender` varchar(10) NOT NULL,
  PRIMARY KEY (`pnr`,`pname`,`page`,`pgender`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



DROP TRIGGER IF EXISTS `before_insert_on_pd`;
DELIMITER //
CREATE TRIGGER `before_insert_on_pd` BEFORE INSERT ON `pd`
 FOR EACH ROW begin
if new.pgender NOT IN ('M','F') then
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Enter M:Male F:Female.';
end if;
end
//
DELIMITER ;
DROP TRIGGER IF EXISTS `before_update_on_pd`;
DELIMITER //
CREATE TRIGGER `before_update_on_pd` BEFORE UPDATE ON `pd`
 FOR EACH ROW begin
if new.pgender NOT IN ('M','F') then
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Enter M:Male F:Female.';
end if;
end
//
DELIMITER ;


CREATE TABLE IF NOT EXISTS `resv` (
  `pnr` int(11) NOT NULL AUTO_INCREMENT,
  `id` int(11) NOT NULL,
  `trainno` int(11) NOT NULL,
  `sp` varchar(50) NOT NULL,
  `dp` varchar(50) NOT NULL,
  `doj` date NOT NULL,
  `tfare` int(11) NOT NULL,
  `class` varchar(50) NOT NULL,
  `nos` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`pnr`),
  UNIQUE KEY `UNIQUE` (`id`,`trainno`,`doj`,`status`),
  UNIQUE KEY `pnr` (`pnr`,`id`,`trainno`,`doj`,`class`,`status`),
  UNIQUE KEY `pnr_2` (`pnr`,`id`,`trainno`,`sp`,`dp`,`doj`,`tfare`,`class`,`nos`,`status`),
  KEY `FK_ID` (`id`),
  KEY `FK_TN_DOJ_C` (`trainno`,`doj`,`class`),
  KEY `class` (`class`),
  KEY `sp` (`sp`,`dp`),
  KEY `dp` (`dp`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;




-- Drop old triggers if they exist
DROP TRIGGER IF EXISTS `before_insert_on_resv`;
DROP TRIGGER IF EXISTS `after_insert_on_resv`;
DROP TRIGGER IF EXISTS `before_update_on_resv`;
DROP TRIGGER IF EXISTS `after_update_on_resv`;

DELIMITER //

-- BEFORE INSERT Trigger
CREATE TRIGGER `before_insert_on_resv` BEFORE INSERT ON `resv`
FOR EACH ROW
BEGIN
    IF NEW.tfare < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Negative balance NOT possible';
    END IF;

    IF NEW.nos <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Negative OR 0 seats NOT possible';
    END IF;

    IF (
        SELECT cs.seatsleft
        FROM classseats cs
        JOIN train t ON cs.trainno = t.trainno
        WHERE cs.trainno = NEW.trainno
          AND cs.class = NEW.class
          AND cs.doj = NEW.doj
          AND t.sp = NEW.sp
          AND t.dp = NEW.dp
    ) < NEW.nos THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Not enough seats available!!!';
    END IF;

    IF DATEDIFF(NEW.doj, CURDATE()) < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Booking Not Possible!!!!';
    END IF;

    SET NEW.status = 'BOOKED';
END;
//

-- AFTER INSERT Trigger
CREATE TRIGGER `after_insert_on_resv` AFTER INSERT ON `resv`
FOR EACH ROW
BEGIN
    UPDATE classseats cs
    JOIN train t ON cs.trainno = t.trainno
    SET cs.seatsleft = cs.seatsleft - NEW.nos
    WHERE cs.trainno = NEW.trainno
      AND cs.class = NEW.class
      AND cs.doj = NEW.doj
      AND t.sp = NEW.sp
      AND t.dp = NEW.dp;
END;
//

-- BEFORE UPDATE Trigger
CREATE TRIGGER `before_update_on_resv` BEFORE UPDATE ON `resv`
FOR EACH ROW
BEGIN
    IF NEW.tfare < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Negative balance NOT possible';
    END IF;

    IF NEW.nos <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Negative OR 0 seats NOT possible';
    END IF;

    IF (
        SELECT cs.seatsleft
        FROM classseats cs
        JOIN train t ON cs.trainno = t.trainno
        WHERE cs.trainno = NEW.trainno
          AND cs.class = NEW.class
          AND cs.doj = NEW.doj
          AND t.sp = NEW.sp
          AND t.dp = NEW.dp
    ) < NEW.nos THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Not enough seats available!!!';
    END IF;
END;
//

-- AFTER UPDATE Trigger
CREATE TRIGGER `after_update_on_resv` AFTER UPDATE ON `resv`
FOR EACH ROW
BEGIN
    IF (NEW.status = 'CANCELLED' AND DATEDIFF(NEW.doj, CURDATE()) < 0) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cancellation Not Possible!!!!';
    END IF;

    IF (NEW.status = 'CANCELLED' AND DATEDIFF(NEW.doj, CURDATE()) > 0) THEN
        UPDATE classseats cs
        JOIN train t ON cs.trainno = t.trainno
        SET cs.seatsleft = cs.seatsleft + NEW.nos
        WHERE cs.trainno = NEW.trainno
          AND cs.class = NEW.class
          AND cs.doj = NEW.doj
          AND t.sp = NEW.sp
          AND t.dp = NEW.dp;

        IF DATEDIFF(NEW.doj, CURDATE()) >= 30 THEN
            INSERT INTO canc VALUES (NEW.pnr, NEW.tfare);
        ELSE
            INSERT INTO canc VALUES (NEW.pnr, 0.5 * NEW.tfare);
        END IF;
    END IF;
END;
//

DELIMITER ;



CREATE TABLE IF NOT EXISTS `station` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sname` varchar(50) NOT NULL,
  PRIMARY KEY (`sname`),
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;





CREATE TABLE IF NOT EXISTS `train` (
  `trainno` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Train_no',
  `tname` varchar(50) NOT NULL COMMENT 'Train_name',
  `sp` varchar(50) NOT NULL COMMENT 'Starting_Point',
  `st` time NOT NULL COMMENT 'Arrival_Time',
  `dp` varchar(50) NOT NULL COMMENT 'Destination_Point',
  `dt` time NOT NULL,
  `dd` varchar(10) DEFAULT NULL COMMENT 'Day',
  `distance` int(11) NOT NULL COMMENT 'Distance',
  PRIMARY KEY (`trainno`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;



DROP TRIGGER IF EXISTS `before_insert_on_train`;
DELIMITER //
CREATE TRIGGER `before_insert_on_train` BEFORE INSERT ON `train`
 FOR EACH ROW begin
if (new.dt<new.st AND new.dd='Day 1') then
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Improper Timings';
end if;
if (new.dp=new.sp) then
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Same Starting & Destination Points not allowed';
end if;
end
//
DELIMITER ;
DROP TRIGGER IF EXISTS `before_update_on_train`;
DELIMITER //
CREATE TRIGGER `before_update_on_train` BEFORE UPDATE ON `train`
 FOR EACH ROW begin
if (new.dt<new.st AND new.dd='Day 1') then
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Improper Timings';
end if;
end
//
DELIMITER ;



CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emailid` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `mobileno` varchar(11) NOT NULL,
  `dob` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUEMN` (`mobileno`),
  UNIQUE KEY `UNIQUEEI` (`emailid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;



DROP TRIGGER IF EXISTS `before_insert_on_user`;
DELIMITER //
CREATE TRIGGER `before_insert_on_user` BEFORE INSERT ON `user`
 FOR EACH ROW begin
if (year(curdate())-year(new.dob))<18 then 
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Minimum age bar of 18 years.';
end if;
end
//
DELIMITER ;
DROP TRIGGER IF EXISTS `before_update_on_user`;
DELIMITER //
CREATE TRIGGER `before_update_on_user` BEFORE UPDATE ON `user`
 FOR EACH ROW begin
if (year(curdate())-year(new.dob))<18 then 
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Minimum age bar of 18 years.';
end if;
end
//
DELIMITER ;


ALTER TABLE `classseats`
  ADD CONSTRAINT `classseats_ibfk_1` FOREIGN KEY (`trainno`) REFERENCES `train` (`trainno`),
  ADD CONSTRAINT `classseats_ibfk_5` FOREIGN KEY (`class`) REFERENCES `class` (`cname`);


ALTER TABLE `resv`
  ADD CONSTRAINT `resv_ibfk_1` FOREIGN KEY (`trainno`) REFERENCES `train` (`trainno`),
  ADD CONSTRAINT `resv_ibfk_2` FOREIGN KEY (`sp`) REFERENCES `station` (`sname`),
  ADD CONSTRAINT `resv_ibfk_3` FOREIGN KEY (`dp`) REFERENCES `station` (`sname`);



ALTER TABLE `train`
  ADD CONSTRAINT `train_ibfk_1` FOREIGN KEY (`sp`) REFERENCES `station` (`sname`),
  ADD CONSTRAINT `train_ibfk_2` FOREIGN KEY (`dp`) REFERENCES `station` (`sname`);


//abcd
insert into admin (admin_name,password) values('zulqarnain','$2a$10$WRTL5rHx6/6aFl1MDwEceukDa5uJFKicG4cjztcw8eH/LiJbTzGbO');

INSERT INTO `class` (`cname`) VALUES
('AC1'),
('AC2'),
('AC3'),
('CC'),
('EC'),
('SL');