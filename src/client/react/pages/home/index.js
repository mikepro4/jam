import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import posed, { PoseGroup } from 'react-pose';
import SplitText from 'react-pose-text';

class HomePage extends Component {
	state = {
    isVisible: false
	};

	componentDidMount() {
		this.setState({
			isVisible: true
		})
	}

	renderHead = () => (
		<Helmet>
			<title>OF – Home Page</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
	)

	getHeight = () => {
		if(this.refs.square) {
			let itemWidth = this.refs.square.clientWidth
			return itemWidth
		}
	}

	render() {
		let imgStyle = {
			// transform: `translateY(${this.props.totalScrolledPixels /2}px)`
		}
		return (
      <div className="route-container route-home">

				<div
					className="of-grid-fixed-left-0 of-grid-fixed-width-5"
					style={{
						top: "40px"
					}}
				>
					nav
				</div>

        <div className="of-grid-content-layer"  style={imgStyle}>
					<div className="screen">

						<div className="of-grid-row"
							style={{
								marginTop: "100px"
							}}
						>
							<div className="of-grid-gutter-3 of-grid-3">
								test
							</div>

							<div
								className="of-grid-gutter-3 of-grid-3"
								ref="square"
								style={{
									height: this.getHeight() + "px",
									// background: "rgba(255,0,0, 0.2)"
								}}
							>
								square
							</div>
						</div>

						<div className="of-grid-gutter-9 of-grid-5"
						style={{
							marginTop: "100px"
						}}>
							here
						</div>
					</div>
					<div className="screen"/>
        </div>

      </div>
		);
	}
}

function mapStateToProps({ app }) {
	return {
		appVisible: app.appVisible,
		introLength: app.introLength,
    totalScrolledPixels: app.totalScrolledPixels,
		clientWidth: app.clientWidth
	};
}

export default {
	component: connect(mapStateToProps, {})(HomePage)
}
