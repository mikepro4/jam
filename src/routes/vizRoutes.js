const keys = require("../config/keys");
const requireLogin = require("../middlewares/requireLogin");
const axios = require("axios");
const _ = require("lodash");
const mongoose = require("mongoose");
const Viz = mongoose.model("viz");

module.exports = app => {
	app.post("/viz/search", async (req, res) => {
	});

	app.post("/viz/add", requireLogin, async (req, res) => {
	});

	app.post("/viz/update", requireLogin, async (req, res) => {
	});

	app.post("/viz/delete", requireLogin, async (req, res) => {
	});
};
