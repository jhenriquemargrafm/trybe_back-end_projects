SELECT CONCAT(workers.FIRST_NAME, ' ', workers.LAST_NAME) AS 'Nome completo',
DATE_FORMAT(register.START_DATE, '%d/%m/%Y') AS 'Data de início',
DATE_FORMAT(register.END_DATE, '%d/%m/%Y') AS 'Data de rescisão',
ROUND(DATEDIFF(register.END_DATE, register.START_DATE) / 365, 2) AS 'Anos trabalhados'
FROM hr.employees AS workers
INNER JOIN 
hr.job_history AS register
ON workers.EMPLOYEE_ID = register.EMPLOYEE_ID
ORDER BY `Nome completo`, `Anos trabalhados`;
