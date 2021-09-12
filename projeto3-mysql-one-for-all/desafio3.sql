CREATE VIEW historico_reproducao_usuarios AS
SELECT USERS.username AS usuario, MUSICS.song AS nome
  FROM SpotifyClone.listened_songs AS HISTORY
INNER JOIN SpotifyClone.user_list AS USERS
  ON HISTORY.user_id = USERS.user_id
INNER JOIN SpotifyClone.song_list AS MUSICS 
  ON HISTORY.song_id = MUSICS.song_id
ORDER BY usuario, nome;
