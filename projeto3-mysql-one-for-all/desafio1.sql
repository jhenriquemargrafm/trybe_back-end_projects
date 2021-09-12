DROP DATABASE IF EXISTS SpotifyClone;

CREATE DATABASE SpotifyClone;
USE SpotifyClone;

CREATE TABLE plan_list(
plan_id INT PRIMARY KEY AUTO_INCREMENT,
plan VARCHAR(20) NOT NULL,
price DECIMAL(3, 2) NOT NULL
) ENGINE = InnoDB;

INSERT INTO plan_list (plan, price)
VALUES
  ('gratuito', 0.00),
  ('familiar', 7.99),
  ('univesitário', 5.99);

CREATE TABLE artist_list(
artist_id INT PRIMARY KEY AUTO_INCREMENT,
artist_name VARCHAR(30) NOT NULL
) ENGINE = InnoDB;

INSERT INTO artist_list (artist_name)
VALUES
  ('Walter Phoenix'),
  ('Peter Strong'),
  ('Lance Day'),
  ('Freedie Shannon');

CREATE TABLE user_list(
user_id INT PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(20) NOT NULL,
age INT NOT NULL,
plan_id INT NOT NULL,
FOREIGN KEY (plan_id) REFERENCES plan_list(plan_id)
) ENGINE = InnoDB;

INSERT INTO user_list (username, age, plan_id)
VALUES
  ('Thati', 23, 1),
  ('Cintia', 35, 2),
  ('Bill', 20, 3),
  ('Roger', 45, 1);

CREATE TABLE albums_list(
album_id INT PRIMARY KEY AUTO_INCREMENT,
album VARCHAR(30) NOT NULL,
artist_id INT NOT NULL,
FOREIGN KEY (artist_id) REFERENCES artist_list(artist_id)
) ENGINE = InnoDB;

INSERT INTO albums_list (album, artist_id)
VALUES
  ('Envious', 1),
  ('Exuberant', 1),
  ('Hallowed Steam', 2),
  ('Incandescent', 3),
  ('Temporary Culture', 4);

CREATE TABLE song_list(
song_id INT PRIMARY KEY AUTO_INCREMENT,
song VARCHAR(30) NOT NULL,
artist_id INT NOT NULL, 
album_id INT NOT NULL,
FOREIGN KEY (album_id) REFERENCES albums_list(album_id),
FOREIGN KEY (artist_id) REFERENCES artist_list(artist_id)
) ENGINE = InnoDB;

INSERT INTO song_list (song, artist_id, album_id)
VALUES
    ('Soul For Us', 1, 1),
    ('Reflections Of Magic', 1, 1),
    ('Dance With Her Own', 1, 1),
    ('Troubles Of My Inner Fire', 1, 2),
    ('Time Fireworks', 1, 2),
    ('Magic Circus', 2, 3),
    ('Honey, So Do I', 2, 3),
    ("Sweetie, Let's Go Wild", 2, 3),
    ('She Knows', 2, 3),
    ('Fantasy For Me', 3, 4),
    ('Celebration Of More', 3, 4),
    ('Rock His Everything', 3, 4),
    ('Home Forever', 3, 4),
    ('Diamond Power', 3, 4),
    ("Honey, Let's Be Silly", 3, 4),
    ('Thang Of Thunder', 4, 5),
    ('Words Of Her Life', 4, 5),
    ('Without My Streets', 4, 5);

CREATE TABLE following(
user_id INT NOT NULL,
artist_id INT NOT NULL,
CONSTRAINT PRIMARY KEY (user_id, artist_id),
FOREIGN KEY (user_id) REFERENCES user_list(user_id),
FOREIGN KEY (artist_id) REFERENCES artist_list(artist_id)
) ENGINE = InnoDB;

INSERT INTO following (user_id, artist_id)
VALUES
    (1, 1),
    (1, 4),
    (1, 3),
    (2, 1),
    (2, 3),
    (3, 2),
    (3, 1),
    (4, 4);

CREATE TABLE listened_songs(
user_id INT NOT NULL,
song_id INT NOT NULL,
CONSTRAINT PRIMARY KEY (user_id, song_id),
FOREIGN KEY (user_id) REFERENCES user_list(user_id),
FOREIGN KEY (song_id) REFERENCES song_list(song_id)
) ENGINE = InnoDB;

INSERT INTO listened_songs (user_id, song_id)
VALUES
    (1, 1),
    (1, 6),
    (1, 14),
    (1, 16),
    (2, 13),
    (2, 17),
    (2, 2),
    (2, 15),
    (3, 4),
    (3, 16),
    (3, 6),
    (4, 3),
    (4, 18),
    (4, 11);
