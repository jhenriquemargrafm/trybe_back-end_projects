CREATE VIEW top_2_hits_do_momento AS
SELECT MUSICS.song AS cancao, COUNT(*) AS reproducoes
  FROM SpotifyClone.song_list AS MUSICS
INNER JOIN SpotifyClone.listened_songs AS HISTORY
  ON MUSICS.song_id = HISTORY.song_id
GROUP BY cancao
ORDER BY reproducoes DESC, cancao LIMIT 2;
