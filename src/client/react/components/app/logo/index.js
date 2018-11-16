import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import SplitText from 'react-pose-text';
import classNames from "classnames"
import { Link } from "react-router-dom";

const wordPoses = {
  closed: { translateY: 30, opacity: 0 },
  open: {
    translateY: 0,
    opacity: 1,
    transition: {
     duration: 500,
    },
    delay: ({ wordIndex }) => wordIndex * 150
  }
};

class Logo extends Component {
	state = {};

	render() {
		return (
      <div className="of-grid-logo">
        <div className="of-container">
          <Link to ="/" className="home-link">
              <SplitText
                className="of-text"
                initialPose="closed"
                pose={this.props.isVisible ? "open": "closed"}
                wordPoses={wordPoses}
                onPoseComplete={()=> {}}
                onValueChange={{
                  translateY: v => {},
                  opacity: v => {}
                }}
              >
                Olena Finch
              </SplitText>
            </Link>
        </div>
      </div>
		)
	}
}

function mapStateToProps({app}) {
	return {
    isVisible: app.appVisible,
	};
}

export default connect(mapStateToProps, {})(Logo);
