import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import posed, { PoseGroup } from 'react-pose';
import SplitText from 'react-pose-text';

class HomePage extends Component {
	state = {};

	componentDidMount() {}

	renderHead = () => (
		<Helmet>
			<title>OF – Home Page</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
	)

	render() {
		return (
      <div className="route-container route-home">

        <div className="of-grid-content-layer">
          <div className="of-grid-row">
            <div className="of-grid-gutter-4 of-grid-5">
							about
            </div>
          </div>
        </div>
      </div>
		);
	}
}

function mapStateToProps({ app }) {
	return {
    appVisible: app.appVisible
  };
}

export default {
	component: connect(mapStateToProps, {})(HomePage)
}
