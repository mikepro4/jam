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


import { showApp, showGrid, hideGrid, fetchImageDetails, fetchUserDetails, loadAllDetail, resetScrollTo} from "./redux/actions/appActions";

import Grid from "./react/components/grid"
import MainLinks from "./react/components/navigation/main_links/"

import Logo from "./react/components/app/logo/"
import Intro from "./react/components/app/intro/"
import TopLeft from "./react/components/app/top_left/"
import TopRight from "./react/components/app/top_right/"
import BottomRight from "./react/components/app/bottom_right/"
import BottomLeft from "./react/components/app/bottom_left/"

FocusStyleManager.onlyShowFocusOnTabs();

class App extends Component {
	state = {
		introVisible: false,
		appVisible: false,
		instagramHovered: false,
		facebookHovered: false,
		clientY: 0,
		clientX: 0,
		pageY: 0,
		vlientWidth: 0,
		gridOnTop: false,

	};

	// static loadData(store, match) {
	// 	return store.dispatch(loadAllDetails());
	// }

	componentDidMount() {

		this.props.fetchUserDetails()

		// this.props.fetchImageDetails()

		if(this.props.appVisible) {
			this.setState({
				appVisible: true
			})
		}

		// this.props.imageUrls.map((image, i) => {
    //     this.props.fetchImageDetails(image.id, i)
    // })
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
		if(true) {
			this.setState({
				clientWidth: document.getElementById("body").clientWidth,
				clientY: e.clientY,
				clientX: e.clientX,
				pageY: e.pageY
			})
		}
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

				<Intro />

				<div className="of-grid of-grid-app">

					<BottomLeft isVisible={this.state.appVisible}/>

					<div className={classNames({"of-grid-content-visible": this.props.appVisible}, "of-grid-content")}>
						{renderRoutes(this.props.route.routes)}
					</div>

				</div>

			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		appVisible: state.app.appVisible,
		gridVisible: state.app.gridVisible,
		location: state.router.location,
		scrollTo: state.app.scrollTo
	};
}

export default {
	component: connect(mapStateToProps, { showApp, showGrid, hideGrid, fetchImageDetails, fetchUserDetails, resetScrollTo })(withRouter(App))
};
