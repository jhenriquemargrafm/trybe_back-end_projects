CREATE VIEW faturamento_atual AS
SELECT MIN(PLANS.price) AS faturamento_minimo,
  MAX(PLANS.price) AS faturamento_maximo,
  ROUND(AVG(PLANS.price), 2) AS faturamento_medio,
  SUM(PLANS.price) AS faturamento_total
FROM SpotifyClone.user_list AS USERS
  INNER JOIN SpotifyClone.plan_list AS PLANS
ON USERS.plan_id = PLANS.plan_id;
