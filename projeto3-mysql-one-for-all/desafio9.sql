USE SpotifyClone;
DELIMITER $$

CREATE PROCEDURE albuns_do_artista(IN artist VARCHAR(50))
BEGIN
SELECT
  ARTIST.artist_name AS 'artista',
  ALBUMS.album AS 'album'
FROM SpotifyClone.artist_list AS ARTIST
INNER JOIN SpotifyClone.albums_list AS ALBUMS
  ON ARTIST.artist_id = ALBUMS.artist_id
WHERE ARTIST.artist_name = artist;
END $$

DELIMITER ;
