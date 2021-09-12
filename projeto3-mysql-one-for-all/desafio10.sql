DELIMITER $$

CREATE FUNCTION quantidade_musicas_no_historico (which_id INT)
RETURNS INT READS SQL DATA
BEGIN
  DECLARE total_songs INT;
  SELECT COUNT(*) AS quantidade_musicas_no_historico
  FROM SpotifyClone.listened_songs
  WHERE user_id = which_id INTO total_songs;
  RETURN total_songs;
END $$

DELIMITER ;
