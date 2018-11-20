import React from "react";
import App from "../App";
import Home from "../react/pages/home";
import About from "../react/pages/about";
import Canvas from "../react/pages/canvas";
import MyJams from "../react/pages/myjams";
import Browse from "../react/pages/Browse";

export default [
	{
		...App,
		routes: [
			{
				...Home,
				path: "/",
				exact: true,
				params: {
					name: "home"
				}
			},
			{
				...About,
				path: "/about",
				exact: true,
				params: {
					name: "about"
				}
			},
			{
				...Canvas,
				path: "/canvas",
				exact: true,
				params: {
					name: "canvas"
				}
			},
			{
				...MyJams,
				path: "/myjams",
				exact: true,
				params: {
					name: "my jams"
				}
			},
			{
				...Browse,
				path: "/browse",
				exact: true,
				params: {
					name: "browse"
				}
			}
		]
	}
];
