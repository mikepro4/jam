import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import SplitText from 'react-pose-text';
import classNames from "classnames"
import { Link } from "react-router-dom";
import posed from 'react-pose';

const SocialLink = posed.div({
  exit: { translateY: 30, opacity: 0 },
  enter: {
    translateY: 0,
    opacity: 1,
    transition: {
     duration: 600,
	 }
  }
});

class TopRight extends Component {
	state = {
    emailVisible: false
  };

  componentDidUpdate(prevprops) {
    if(this.props.isVisible == true && this.state.emailVisible == false) {
      setTimeout(() => {
        this.setState({
          emailVisible: true
        })
      }, 2000)
    }
  }

	render() {
		return (
      <div className="of-grid-top-right">
        <div className="of-container">
          <SocialLink
            initialPose="exit"
            pose={this.state.emailVisible ? "enter": "exit"}
          >
            <a href="#" className="line-hover">contact@olenafinch.com</a>
          </SocialLink>
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

export default connect(mapStateToProps, {})(TopRight);
