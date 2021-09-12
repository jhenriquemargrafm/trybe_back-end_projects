DELIMITER $$

CREATE PROCEDURE exibir_historico_completo_por_funcionario(IN worker_email VARCHAR(100))
BEGIN
SELECT
CONCAT(worker.FIRST_NAME, ' ', worker.LAST_NAME) AS `Nome completo`, 
area.DEPARTMENT_NAME AS `Departamento`,
position.JOB_TITLE AS `Cargo`
FROM hr.job_history AS register
JOIN hr.employees AS worker
ON worker.EMPLOYEE_ID = register.EMPLOYEE_ID AND worker.EMAIL = worker_email
JOIN hr.jobs AS position
ON register.JOB_ID = position.JOB_ID
JOIN hr.departments AS area
ON register.DEPARTMENT_ID = area.DEPARTMENT_ID
ORDER BY `Departamento`, `Cargo`;
END $$

DELIMITER ;
