const keys = require("../config/keys");
const requireLogin = require("../middlewares/requireLogin");
const axios = require("axios");
const _ = require("lodash");
const mongoose = require("mongoose");
const Jam = mongoose.model("jam");

module.exports = app => {
	app.post("/jams/search", async (req, res) => {
	});

	app.post("/jams/add", requireLogin, async (req, res) => {
	});

	app.post("/jams/update", requireLogin, async (req, res) => {
	});

	app.post("/jams/delete", requireLogin, async (req, res) => {
	});
};
