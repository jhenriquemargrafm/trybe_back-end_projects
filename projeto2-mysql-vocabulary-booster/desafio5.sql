SELECT jobs.job_title AS 'Cargo',
(max_salary - min_salary) AS 'Variação Salarial',
ROUND((AVG(min_salary) / 12), 2) AS 'Média mínima mensal',
ROUND((AVG(max_salary) / 12), 2) AS 'Média máxima mensal'
FROM hr.jobs AS jobs
INNER JOIN hr.employees AS employees ON jobs.job_id = employees.job_id
GROUP BY employees.job_id
ORDER BY (max_salary - min_salary) ASC, jobs.job_title;
