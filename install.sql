CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    userId TEXT NOT NULL,
    username TEXT NOT NULL,
    userEmail TEXT NOT NULL,
    password TEXT,
    userImage TEXT NOT NULL,
    permType TEXT NOT NULL,
    authStrat TEXT NOT NULL,
    joinTime TEXT NOT NULL,
    banned BOOLEAN NOT NULL,
    staffNotes TEXT NOT NULL,
PRIMARY KEY (id));

CREATE TABLE movies(
    id INT NOT NULL AUTO_INCREMENT,
    movieId TEXT NOT NULL,
    movieTitle TEXT NOT NULL,
    releaseYear TEXT NOT NULL,
    movieImage TEXT NOT NULL,
    movieClassification TEXT NOT NULL,

PRIMARY KEY (id));

CREATE TABLE reviews(
    id INT NOT NULL AUTO_INCREMENT,
    reviewId TEXT NOT NULL,
    userId TEXT NOT NULL,
    movieId TEXT NOT NULL,
    reviewTitle TEXT NOT NULL,
    reviewBody TEXT NOT NULL,
    reviewRating TEXT NOT NULL,
    reviewDate TEXT NOT NULL,
PRIMARY KEY (id));