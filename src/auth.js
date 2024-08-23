const passport = require('passport'); let LocalStrategy = require('passport-local').Strategy; 
const bcrypt = require('bcrypt'); const { v7: uuidv7 } = require('uuid');

module.exports = function(app, connection, config) {
    logger("Authentication Modules Loaded!", { color: "green", title: "Auth" });

    app.get('/login/create', function (req, res) {
		getUserInfo(req, res, function (userData) {
			res.render("./auth/local.account.create.ejs", { req: req, user: userData, err: req.query.err, noti: req.query.noti});
		});
	})

    app.post('/auth/account/create', function (req, res) {
		const name = req.body.name.replaceAll("'", "''");
		const email = req.body.email.replaceAll("'", "''");
		const password = req.body.password.replaceAll("'", "''");
		const createDate = Date.now();
		connection.query("SELECT * FROM users", (err, userResults) => {
			if(userResults?.length) if(userResults[0]?.email === email || userResults[0]?.username === name) return res.redirect(`/login/create?noti=${encodeURIComponent('Username or Email is already in use.')}&style=danger`)
			bcrypt.hash(password, 10, function (err, hash) {
				if (err) throw err;
				let id = uuidv7();
				connection.query(`INSERT INTO users (userId, username, userEmail, password, userImage, permType, authStrat, joinTime, banned, staffNotes) VALUES ('${id}', '${name}', '${email}', '${hash}', '/images/notfound.png', 4, 'local', '${createDate}', '0', 'null')`, function (err, result) {
					if(err) console.log(err);
					user = {
						loggedIn: true,
						id: id,
						username: name,
						avatar: '/images/notfound.png',
						permType: 4,
						authStrat: 'local',
						banned: 0,
						staffNotes: null
					}
					req.login(user, function(err) {
						if (err) { return next(err); }
						return res.redirect(`/`);
					});
				});
			});
		})
	})

    app.get("/login", function (req, res) {
		getUserInfo(req, res, function (userData) {
			res.render("./auth/login", { req: req, user: userData, err: req.query.err, noti: req.query.noti, title: "Login"  });
		});
	});
	app.get("/logout", function (req, res) {
		req.logout(function (err) {
			if (err) {
				return next(err);
			}
			res.redirect(`/`);
		});
	});

	app.get("/signup", function (req, res) {
		res.render("./auth/signup", { req: req, title: "Sign Up" });
	})

	app.get('/password-reset', function (req, res) {
		res.render('./auth/passwordreset', { req: req, title: "Password Reset" });
	})

}