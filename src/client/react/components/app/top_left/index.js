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

const Divider = posed.div({
  exit: { translateX: "-100%" },
  enter: {
    translateX: 0,
    transition: {
     duration: 300
	 }
  }
});

class TopLeft extends Component {
	state = {
    instagramVisible: false,
    dividerVisible: false,
    facebookVisible: false
  };

  componentDidUpdate(prevprops) {
    if(this.props.isVisible == true && this.state.instagramVisible == false) {
      setTimeout(() => {
        this.setState({
          instagramVisible: true
        })
      }, 2000)
    }
  }

	render() {
		return (
      <div className={classNames({
        "hidden-component": !this.state.instagramVisible
        }, "of-grid-top-left")}
      >
        <div
          className="of-container"
          onMouseEnter={() => this.setState({instagramHovered: true})}
          onMouseLeave={() => this.setState({instagramHovered: false})}
        >
          <SocialLink
            initialPose="exit"
            pose={this.state.instagramVisible ? "enter": "exit"}
            onPoseComplete={(pose)=> {
                if(pose == "enter") {
                  this.setState({ dividerVisible: true })
                }
              }
            }
          >
            <a href="">Instagram</a>
          </SocialLink>
        </div>

        <div className="divider-container">
          <Divider
            initialPose="exit"
            pose={this.state.dividerVisible ? "enter": "exit"}
            onPoseComplete={(pose)=> {
                if(pose == "enter") {
                  this.setState({ facebookVisible: true })
                }
              }
            }
            className={classNames({
              "right": this.state.facebookHovered,
              "left": this.state.instagramHovered,
            }, "divider-bar")}
          />
        </div>

        <div
          className="of-container"
          onMouseEnter={() => this.setState({facebookHovered: true})}
          onMouseLeave={() => this.setState({facebookHovered: false})}
        >
            <SocialLink
              initialPose="exit"
              pose={this.state.facebookVisible ? "enter": "exit"}
              onPoseComplete={(pose)=> {
                  if(pose == "enter") {
                    this.setState({ dividerVisible: true })
                  }
                }
              }
            >
              <a href="#">Facebook</a>
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

export default connect(mapStateToProps, {})(TopLeft);
