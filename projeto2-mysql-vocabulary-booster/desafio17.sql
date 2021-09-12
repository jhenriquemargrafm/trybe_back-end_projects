DELIMITER $$

CREATE TRIGGER trigger_insert_currentDate
BEFORE INSERT ON w3schools.orders
FOR EACH ROW
BEGIN
SET NEW.OrderDate = NOW();
END $$

DELIMITER ;
