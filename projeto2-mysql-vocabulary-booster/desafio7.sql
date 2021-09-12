SELECT UCASE(CONCAT(employees.first_name, ' ', employees.last_name)) AS 'Nome completo',
  start.start_date AS 'Data de início',
  employees.salary AS 'Salário'
FROM hr.employees AS employees
  INNER JOIN hr.job_history AS start
  ON employees.employee_id = start.employee_id
WHERE MONTH(start.start_date) BETWEEN 1 AND 3
ORDER BY UCASE(CONCAT(employees.first_name, ' ', employees.last_name)), start.start_date ASC;
