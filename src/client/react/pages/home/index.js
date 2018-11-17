import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import posed, { PoseGroup } from 'react-pose';
import SplitText from 'react-pose-text';

class HomePage extends Component {
	state = {
	};

	componentDidMount() {
	}

	renderHead = () => (
		<Helmet>
			<title>JAM DNA – Home Page</title>
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
		return (
      <div className="route-container route-home">
        <div className="of-grid-content-layer" >
					content
        </div>

      </div>
		);
	}
}

function mapStateToProps({ app }) {
	return {
    totalScrolledPixels: app.totalScrolledPixels,
		clientWidth: app.clientWidth
	};
}

export default {
	component: connect(mapStateToProps, {})(HomePage)
}
