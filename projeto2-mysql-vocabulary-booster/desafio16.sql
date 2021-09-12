DELIMITER $$

CREATE FUNCTION buscar_quantidade_de_empregos_por_funcionario(worker_email VARCHAR(100)) 
RETURNS int READS SQL DATA
BEGIN
DECLARE count_jobs INT;
SELECT COUNT(*)
FROM hr.job_history
WHERE employee_id IN (
SELECT employee_id 
FROM hr.employees
WHERE email = worker_email
)
INTO count_jobs;
RETURN count_jobs;
END $$

DELIMITER ;
