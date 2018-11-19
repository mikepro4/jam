const passport = require("passport");

module.exports = app => {
	app.get(
		"/api/auth/google",
		passport.authenticate("google", {
			scope: [
				"profile",
				"email",
				"https://www.googleapis.com/auth/youtube",
				"https://www.googleapis.com/auth/youtube.upload"
			],
			accessType: 'offline',
			approvalPrompt: 'force'
		})
	);

	app.get(
		"/api/auth/google/callback",
		passport.authenticate("google"),
		(req, res) => {
			res.redirect("/myjams");
		}
	);

	app.get(
		"/api/auth/google/callback",
		passport.authenticate("google"),
		(req, res) => {
			res.redirect("/");
		}
	);

	app.get("/api/logout", (req, res) => {
		req.logout();
		res.redirect("/");
	});

	app.get("/api/current_user", (req, res) => {
		res.send(req.user);
	});
};
