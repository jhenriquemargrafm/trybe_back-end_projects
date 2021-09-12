SELECT CONCAT(worker.first_name, ' ', worker.last_name) AS 'Nome completo funcionário 1',
  worker.salary AS 'Salário funcionário 1',
  worker.phone_number AS 'Telefone funcionário 1',
  CONCAT(comparison.first_name, ' ', comparison.last_name) AS 'Nome completo funcionário 2',
  comparison.salary AS 'Salário funcionário 2',
  comparison.phone_number AS 'Telefone funcionário 2'
FROM
  hr.employees AS worker,
  hr.employees AS comparison
WHERE worker.job_id = comparison.job_id AND worker.employee_id <> comparison.employee_id
ORDER BY `Nome completo funcionário 1`, `Nome completo funcionário 2`;
