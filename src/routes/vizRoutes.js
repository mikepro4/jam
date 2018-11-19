const keys = require("../config/keys");
const requireLogin = require("../middlewares/requireLogin");
const axios = require("axios");
const _ = require("lodash");
const mongoose = require("mongoose");
const Viz = mongoose.model("viz");

module.exports = app => {

	// ===========================================================================

	app.post("/api/viz/search", async (req, res) => {
		const { criteria, sortProperty, offset, limit } = req.body;
		const query = Viz.find(buildQuery(criteria))
			.sort({ [sortProperty]: -1 })
			.skip(offset)
			.limit(limit);

		return Promise.all(
			[query, Viz.find(buildQuery(criteria)).countDocuments()]
		).then(
			results => {
				return res.json({
					all: results[0],
					count: results[1],
					offset: offset,
					limit: limit
				});
			}
		);
	});

	// ===========================================================================

	app.post("/api/viz/create", requireLogin, async (req, res) => {
		let updateVizMetadata = _.assign({}, req.body.metadata, {
			createdBy: req.user._id,
			createdAt: new Date()
		});

		let updatedViz = _.assign({}, req.body, {
			metadata: updateVizMetadata
		});
		const viz = await new Viz(updatedViz).save();
		res.json(viz);
	});

	// ===========================================================================

	app.post("/api/viz/update", requireLogin, async (req, res) => {
		Viz.update(
			{
				_id: req.body.vizId
			},
			{
				$set: req.body.newViz
			},
			async (err, info) => {
				if (err) res.status(400).send({ error: "true", error: err });
				if (info) {
					Viz.findOne({ _id: req.body.vizId }, async (err, viz) => {
						if (track) {
							res.json({ success: "true", info: info, data: viz });
						}
					});
				}
			}
		);
	});

	// ===========================================================================

	app.post("/api/viz/delete", requireLogin, async (req, res) => {
		Viz.remove({ _id: req.body.vizId }, async (err, viz) => {
			if (err) return res.send(err);
			res.json({
				success: "true",
				message: "deleted  jam"
			});
		});
	});

	// ===========================================================================

	app.post("/api/viz/details", async (req, res) => {
		Viz.findOne({ _id: req.body.vizmId }, async (err, viz) => {
			if (viz) {
				res.json(viz);
			}
		});
	});

	// ===========================================================================
};
