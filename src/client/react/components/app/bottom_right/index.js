import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import SplitText from 'react-pose-text';
import classNames from "classnames"
import { Link } from "react-router-dom";
import posed from 'react-pose';

const Description = posed.div({
  exit: { translateY: 30, opacity: 0 },
  enter: {
    translateY: 0,
    opacity: 1,
    transition: {
     duration: 600,
	 }
  }
});

class BottomRight extends Component {
	state = {
    topLineVisible: false,
    bottomLineVisible: false,
  };

  componentDidUpdate(prevprops) {
    if(this.props.isVisible == true && this.state.topLineVisible == false) {
      setTimeout(() => {
        this.setState({
          topLineVisible: true
        })
      }, 2600)

      setTimeout(() => {
        this.setState({
          bottomLineVisible: true
        })
      }, 2800)
    }
  }

	render() {
		return (
      <div className="of-grid-bottom-right">
        <div className="of-container">
          <Description
            initialPose="exit"
            pose={this.state.topLineVisible ? "enter": "exit"}
          >
            Promotions & modeling
          </Description>
        </div>

        <div className="of-container">
          <Description
            initialPose="exit"
            pose={this.state.bottomLineVisible ? "enter": "exit"}
          >
            New York City
          </Description>
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

export default connect(mapStateToProps, {})(BottomRight);
