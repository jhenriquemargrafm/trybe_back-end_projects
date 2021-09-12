SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS 'Nome completo',
position.job_title AS 'Cargo',
start.start_date AS 'Data de início do cargo',
area.department_name AS 'Departamento'
FROM hr.employees AS employees
INNER JOIN hr.job_history AS start 
ON employees.employee_id = start.employee_id
INNER JOIN hr.jobs AS position 
ON start.job_id = position.job_id
INNER JOIN hr.departments AS area 
ON start.department_id = area.department_id
ORDER BY CONCAT(employees.first_name, ' ', employees.last_name) DESC, position.job_title;
