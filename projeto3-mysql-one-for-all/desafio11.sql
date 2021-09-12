CREATE VIEW cancoes_premium AS
  SELECT MUSIC.song AS nome, COUNT(*) AS reproducoes
FROM SpotifyClone.song_list AS MUSIC
  INNER JOIN SpotifyClone.listened_songs AS HISTORY
  INNER JOIN SpotifyClone.user_list AS USERS
  INNER JOIN SpotifyClone.plan_list AS PLANS
ON HISTORY.song_id = MUSIC.song_id AND USERS.user_id = HISTORY.user_id AND USERS.plan_id = PLANS.plan_id
WHERE PLANS.plan_id IN ('2', '3')
GROUP BY nome
ORDER BY nome;
