USE SpotifyClone;
-- Tem que excluir do user_list, following e listened_songs. Começando pelas tabelas que são foreign keys
DELIMITER $$
CREATE TRIGGER trigger_usuario_delete
BEFORE DELETE ON user_list
FOR EACH ROW
BEGIN
  DELETE FROM following
  WHERE OLD.user_id = user_id;
  DELETE FROM listened_songs
  WHERE OLD.user_id = user_id;
END $$
DELIMITER ;
