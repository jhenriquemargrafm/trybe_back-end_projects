CREATE VIEW perfil_artistas AS
SELECT ARTISTS.artist_name AS artista, ALBUMS.album AS album, COUNT(*) AS seguidores
  FROM SpotifyClone.artist_list AS ARTISTS
INNER JOIN SpotifyClone.albums_list AS ALBUMS
  ON ARTISTS.artist_id = ALBUMS.artist_id
INNER JOIN SpotifyClone.following AS FOLLOWING
  ON ARTISTS.artist_id = FOLLOWING.artist_id
GROUP BY ALBUMS.album_id
ORDER BY seguidores DESC, artista, album;
