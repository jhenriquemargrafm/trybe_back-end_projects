CREATE VIEW top_3_artistas AS
SELECT ARTISTS.artist_name AS artista, COUNT(*) AS seguidores
  FROM SpotifyClone.artist_list AS ARTISTS
INNER JOIN SpotifyClone.following AS FOLLOWING
  ON ARTISTS.artist_id = FOLLOWING.artist_id
GROUP BY artista
ORDER BY seguidores DESC, artista LIMIT 3;
