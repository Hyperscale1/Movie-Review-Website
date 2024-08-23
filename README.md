# Movie Review Website

This is a Movie Review Website built with Express.js. Users can browse movies, read reviews, and post their own reviews.

## Features

- List movies with titles, images, and details
- User profiles with their reviews
- Search and sort reviews
- Authentication system with login, signup, and password reset
- Admin functionality for managing users and reviews

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [MySQL](https://www.mysql.com/)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/hyperscale1/movie-review-website.git
cd movie-review-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up the Database

- Create a MySQL database:

```sql
CREATE DATABASE movie_reviews;
```

- Import the initial schema:

```sql
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
```
```sql
CREATE TABLE movies(
    id INT NOT NULL AUTO_INCREMENT,
    movieId TEXT NOT NULL,
    movieTitle TEXT NOT NULL,
    releaseYear TEXT NOT NULL,
    movieImage TEXT NOT NULL,
    movieClassification TEXT NOT NULL,

PRIMARY KEY (id));
```

```sql
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
```

### 4. Configure Configuration Variables

Edit the existing config.json to your liking.

```json
{
    "siteInformation": {
        "processPort": 3000,
        "domain": "http://localhost:3000"
    },

    "SQLInformation": {
        "host": "localhost",
        "username": "root",
        "password": "",
        "database": "movieReviews"
    }
}
```

### 5. Run the Application

```bash
node .
```

The application will be running on `http://localhost:3000`.

### 6. Access the Website

- Visit `http://localhost:3000` to see the landing page.
- Register, log in, and start browsing or adding movie reviews.

## Project Structure

- `views/`: Contains the EJS templates for the pages.
- `public/`: Static assets like CSS, JavaScript, and images.
- `routes/`: Defines the Express routes.
- `models/`: Database models and queries.
- `controllers/`: Application logic and handlers.

## Contributing

Feel free to open issues or submit pull requests if you'd like to contribute.

## License

This project is licensed under the MIT License.
