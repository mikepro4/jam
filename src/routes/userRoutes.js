const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Users = mongoose.model("users");

module.exports = app => {

	app.post("/get_user", requireLogin, async (req, res) => {
		Users.findOne(
			{
				_id: req.body.id
			},
			async (err, user) => {
				if (user) {
					res.json(user);
				}
			}
		);
	});
};
