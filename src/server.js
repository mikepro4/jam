import express from "express";
import path from "path";
import { matchRoutes } from "react-router-config";
import proxy from "express-http-proxy";
import axios from "axios";
import { ConnectedRouter, push } from "react-router-redux";

import Router from "./client/router";
import renderer from "./helpers/renderer";
import { configure as createStore } from "./client/redux/store";
import reducer from "./client/redux/reducers";
import buildAssets from "../webpack-assets.json";
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'

const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");
const keys = require("./config/keys");

const PORT = process.env.PORT || 3000;
const BASE_API_URL = process.env.BASE_API_URL || "http://localhost:5000";
const HOST = process.env.HOST || `localhost:${PORT}`;
const PROXY_ROUTE = "/api_call";
const PUBLIC_DIR = "public";
const STATIC_DIR = "static";

const app = express();

require("./models/User");
require("./models/Jam");
require("./models/Viz");
require("./services/passport");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

app.use(cors());
app.use(
	PROXY_ROUTE,
	proxy(BASE_API_URL, {
		proxyReqOptDecorator: opts => {
			opts.headers["x-forwarded-host"] = HOST;
			return opts;
		}
	})
);

app.use(bodyParser.json())
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload());


require("./routes/mailRoutes")(app);
require("./routes/authRoutes")(app);

app.use(express.static(STATIC_DIR));
app.use(express.static(PUBLIC_DIR));

app.get("*", (request, response) => {
	const axiosInstance = axios.create({
		baseURL: BASE_API_URL,
		headers: { cookie: request.get("cookie") || "" }
	});

	const { history, store } = createStore(
		{},
		reducer,
		axiosInstance,
		"fromServer"
	);

	store.dispatch(push(request.path));

	const currentRoute = matchRoutes(Router, request.path);

	const need = currentRoute.map(({ route, match }) => {
		if (route.component) {
			return route.component.loadData
				? // the following will be passed into each component's `loadData` method:
					route.component.loadData(
						store,
						match,
						route,
						request.path,
						request.query
					)
				: Promise.resolve(null);
		}
		Promise.resolve(null);
	});

	Promise.all(need).then(() => {
		const staticRouterContext = {};
		const html = renderer(
			request,
			store,
			buildAssets,
			staticRouterContext,
			history
		);
		if (staticRouterContext.url)
			return response.redirect(301, staticRouterContext.url);
		if (staticRouterContext.notFound) response.status(404);
		response.send(html);
	});
});

app.listen(PORT, () => {
	console.log("Server listening at port: ", PORT);
});
