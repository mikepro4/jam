import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import SplitText from 'react-pose-text';
import classNames from "classnames"
import { Link } from "react-router-dom";
import posed from 'react-pose';

const TextLine = posed.div({
  exit: {
    translateY: 30,
    opacity: 0
  },
  enter: {
    translateY: 0,
    opacity: 1,
    transition: {
     duration: 600,
	 }
  }
});

const Avatar = posed.div({
  exit: {
    scale: 1.5,
    opacity: 0
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 600,
	 }
  }
});

class Profile extends Component {
	state = {
    isVisible: false,
    avatarVisible: false,
    topLineVisible: false,
    bottomLineVisible: false,
    avatarUrl: null
  };

  componentDidUpdate(prevprops) {
    if(this.props.isVisible == true && this.state.isVisible == false) {
      setTimeout(() => {
        this.setState({
          isVisible: true
        })
      }, 0)

      setTimeout(() => {
        this.setState({
          topLineVisible: true
        })
      }, 300)

      setTimeout(() => {
        this.setState({
          bottomLineVisible: true
        })
      }, 370)
    }
  }

  componentDidMount() {

  }

	render() {
		return (
      <div className="of-grid-gutter-4 of-grid-5">

        <div className="profile-avatar-container">
          <div className="profile-avatar">
            {this.props.userDetails.avatarUrl ? (
              <Avatar
                initialPose="exit"
                pose={this.state.isVisible ? "enter": "exit"}
              >
                <img src={this.props.userDetails.avatarUrl} />
              </Avatar>
            ) : ""}
          </div>

          <div className="profile-info-container">
            <div className="of-container">
              <TextLine
                initialPose="exit"
                pose={this.state.topLineVisible ? "enter": "exit"}
                className="profile-title"
              >
                @yeah_lenka
              </TextLine>
            </div>

            <div className="of-container">
              <TextLine
                initialPose="exit"
                pose={this.state.bottomLineVisible ? "enter": "exit"}
                className="profile-description"
              >
                200K Followers
              </TextLine>
            </div>
          </div>
        </div>
      </div>
    )
	}
}

function mapStateToProps({app}) {
	return {
    isVisible: app.appVisible,
    userDetails: app.userDetails
	};
}

export default connect(mapStateToProps, {})(Profile);
