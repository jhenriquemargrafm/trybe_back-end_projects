SELECT jobs.job_title AS 'Cargo',
ROUND(AVG(employees.salary), 2) AS 'Média salarial',
CASE
WHEN ROUND(AVG(employees.salary), 2) BETWEEN 2000 AND 5800 THEN 'Júnior'
WHEN ROUND(AVG(employees.salary), 2) BETWEEN 5801 AND 7500 THEN 'Pleno'
WHEN ROUND(AVG(employees.salary), 2) BETWEEN 7501 AND 10500 THEN 'Sênior'
WHEN ROUND(AVG(employees.salary), 2) > 10500 THEN 'CEO'
END AS 'Senioridade'
FROM hr.jobs AS jobs
INNER JOIN hr.employees AS employees ON jobs.job_id = employees.job_id
GROUP BY employees.job_id
ORDER BY ROUND(AVG(employees.salary), 2), jobs.job_title;
