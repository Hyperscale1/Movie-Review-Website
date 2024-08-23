const config = require("../config.json");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const app = express();
const multer = require("multer");
const mysql = require("mysql");
const path = require("path");
var MySQLStore = require("express-mysql-session")(session);

logger = function (str, options) {
    let build = [];
    if ((options.color = "red")) options.color = "91";
    if ((options.color = "blue")) options.color = "94";
    if ((options.color = "yellow")) options.color = "93";
    if ((options.color = "green")) options.color = "92";
    if (options.bold) build.push(`\x1b[1m`);
    if (options.color) build.push(`\x1b[${options.color}m`);
    if (options.title) build.push(`[${options.title}]: \x1b[0m`);
    console.log(`${build.join("")} ${str}`);
  };

process.env.processPort = config["siteInformation"].processPort;
process.title = 'Move Review Site';



var multerStorage = multer.memoryStorage();
app.use(multer({ storage: multerStorage }).any());
app.use(express.static("public"));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

var connection = mysql.createConnection({
    host: config["SQLInformation"].host,
    user: config["SQLInformation"].username,
    password: config["SQLInformation"].password,
    database: config["SQLInformation"].database,
    charset: "utf8mb4",
});
  
connection.connect(function(err) {
if (err) {
    logger("Error connecting to the database: " + err, { color: "red", title: "Database", bold: true });
    return;
}
    logger("Connected to the database!", { color: "green", title: "Database" });
});
  

app.use(
  session({
    // key: 'faxkey',
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore({}, connection),
    cookie: { maxAge: 31556952000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());


app.listen(config["siteInformation"].processPort, async function () {
  require("./starter")(app, connection, config);
});

require("./auth")(app, connection, config);
require("./backend")(app, connection, config);

getUserInfo = async function(req, res, callback) {
  let userInfo = {
      loggedIn: false,
      id: null,
      username: null,
      avatar: null,
      permType: null,
      authStrat: null,
      banned: null,
      staffNotes: null
  }
  if(req.isAuthenticated()) {
      connection.query(`SELECT * FROM users WHERE userId = '${req.user.id}'`, async function(err, results) {
          if(results[0]) {
              userInfo = {
                  loggedIn: true,
                  id: req.user.id,
                  username: results[0]?.username,
                  avatar: results[0]?.userImage,
                  permType: results[0]?.permType,
                  authStrat: results[0]?.authStrat,
                  banned: results[0]?.banned,
                  staffNotes: results[0]?.staffNotes
              }
              return callback(userInfo);
          } else return callback(userInfo);
      })
  } else return callback(userInfo);
}


checkAuth = function(req, res) {
  if(!req.isAuthenticated()) return res.redirect("/login");
  return true;
}


app.get("/", async function (req, res) {
  // checkAuth(req, res);

  res.render("index", { req: req, title : "Home" });
});

app.get("/movies", async function (req, res) {
    connection.query(`SELECT * FROM movies`, async function(err, results) {
      if (err) throw err;
      res.render("movies", { req: req, title : "Movies", movies: results });
    })
})

app.get("/movies/reviews/:id", async function (req, res) {

	connection.query(`SELECT * FROM reviews WHERE movieId = '${req.params.id}'`, async function(err, results) {
		if (err) throw err;
		connection.query(`SELECT * FROM movies WHERE movieId = '${req.params.id}'`, async function(err, movie) {
			if (err) throw err;
			if (!movie[0]) return res.redirect("/error?error=Movie%20not%20found");
			connection.query(`SELECT userId, userImage, username FROM users WHERE userId = '${results[0].userId}'`, async function(err, users) {
				if (err) throw err;
				res.render("reviews/reviews", { req: req, title : "Reviews", reviews: results, movie: movie[0], user: users });
			})
		})
	})
})

app.get("/user/:id", async function (req, res) {
	connection.query(`SELECT * FROM users WHERE userId = '${req.params.id}' LIMIT 1`, async function(err, results) {
		if (err) throw err;
		if (!results[0]) return res.redirect("/error?error=User%20not%20found");
		connection.query(`SELECT * FROM reviews WHERE userId = '${req.params.id}'`, async function(err, reviews) {
			if (err) throw err;
			res.render("user", { req: req, title : `${results[0].username}`, user: results[0], reviews: reviews });
		})
	})
})