CREATE VIEW estatisticas_musicais AS
SELECT ( SELECT COUNT(*) FROM SpotifyClone.song_list) AS cancoes,
( SELECT COUNT(*) FROM SpotifyClone.artist_list) AS artistas,
( SELECT COUNT(*) FROM SpotifyClone.albums_list) AS albuns;
