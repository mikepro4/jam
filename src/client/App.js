import React, { Component } from "react";
import { renderRoutes } from "react-router-config";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FocusStyleManager } from "@blueprintjs/core";
import ReactDOM from "react-dom";
import posed, { PoseGroup } from 'react-pose';
import SplitText from 'react-pose-text';
import keydown from "react-keydown";
import classNames from "classnames"
import { Link } from "react-router-dom";

import {
	showGrid,
	hideGrid,
	resetScrollTo,
	updateTotalPixels,
	updateTotalScrolledPixels,
	fetchCurrentUser
} from "./redux/actions/appActions";

import Grid from "./react/components/grid"
import Header from "./react/components/header"

FocusStyleManager.onlyShowFocusOnTabs();

class App extends Component {
	state = {
		clientY: 0,
		clientX: 0,
		pageY: 0,
		clientWidth: 0
	};

	componentDidMount() {
		let node = document.getElementById("body")

		if(this.props.totalPixels !== node.scrollHeight) {
			this.props.updateTotalPixels(node.scrollHeight, node.clientWidth, node.clientHeight)
		}

		window.addEventListener('scroll', this.handleScroll);
		window.addEventListener("resize", this.handleResize);

		setTimeout(() => {
			this.forceUpdate()
		}, 1)

		this.props.fetchCurrentUser()
	}

	handleScroll = (event) => {
    this.props.updateTotalScrolledPixels(document.getElementById("body").scrollTop)
  }

	handleResize = () => {
    let node = document.getElementById("body")
    this.props.updateTotalPixels(node.scrollHeight, node.clientWidth, node.clientHeight)
  }

	@keydown("T")
	toggleGridOnTop() {
		this.setState({
			gridOnTop: !this.state.gridOnTop
		})
	}

	@keydown("G")
	toggleGrid() {
		if(this.props.gridVisible) {
			this.props.hideGrid()
		} else {
			this.props.showGrid()
		}
	}

	handleScrollToElement = (element, to, duration) => {
			if (duration <= 0) {
					return;
			}
			const timeout = 10;
			const difference = to - element.scrollTop;
			const perTick = (difference / duration) * timeout;

			window.setTimeout(() => {
					element.scrollTop = element.scrollTop + perTick;
					if (element.scrollTop === to) {
							return;
					}
					this.handleScrollToElement(element, to, duration - timeout);
			}, timeout);
	};

	componentDidUpdate(prevProps) {
		// Reset scrolling position on route change
		if(prevProps.location.pathname !== this.props.location.pathname) {
			let node = document.getElementById("body")
			if (node) {
				node.scrollTop = 0
				this.props.resetScrollTo()
			}
		}

		if (this.props.scrollTo) {
			this.handleScrollToElement(document.getElementById("body"), this.props.scrollTo, 500)
			this.props.resetScrollTo()
		}
	}

	onMouseMove = (e) => {
		this.setState({
			clientWidth: document.getElementById("body").clientWidth,
			clientY: e.clientY,
			clientX: e.clientX,
			pageY: e.pageY
		})
	}

	render() {
		return (
			<div className="app" onMouseMove={this.onMouseMove.bind(this)}>

				<Grid
					gridOnTop={this.state.gridOnTop}
					clientY={this.state.clientY}
					clientX={this.state.clientX}
					pageY={this.state.pageY}
					clientWidth={this.state.clientWidth}
				/>

				<Header/>

				<div className="of-grid of-grid-app">

					<div className={classNames({"of-grid-content-visible": true}, "of-grid-content")}>
						{renderRoutes(this.props.route.routes)}
					</div>

				</div>

			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		gridVisible: state.app.gridVisible,
		location: state.router.location,
		scrollTo: state.app.scrollTo,
		auth: state.app.user
	};
}

export default {
	component: connect(mapStateToProps, {
		showGrid,
		hideGrid,
		resetScrollTo,
		updateTotalPixels,
		updateTotalPixels,
		updateTotalScrolledPixels,
		fetchCurrentUser
	})(withRouter(App))
};
