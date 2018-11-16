import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import SplitText from 'react-pose-text';
import classNames from "classnames"
import { Link } from "react-router-dom";
import posed from 'react-pose';


import { updateTotalPixels, updateTotalScrolledPixels} from "../../../../redux/actions/appActions";


import DoubleArrow from "../../../components/svg/double_arrow";

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

const Arrow = posed.div({
  exit: { translateY: -30 },
  enter: {
    translateY: 0,
    transition: {
     duration: 600,
	 }
  }
});

class BottomLeft extends Component {
	state = {
    topLineVisible: false,
    bottomLineVisible: false,
    arrowVisible: false
  };

  componentDidUpdate(prevprops) {
    if(this.props.isVisible == true && this.state.topLineVisible == false) {

      setTimeout(() => {
        this.setState({
          arrowVisible: true
        })
      }, 2500)

      setTimeout(() => {
        this.setState({
          topLineVisible: true
        })
      }, 2700)

      setTimeout(() => {
        this.setState({
          bottomLineVisible: true
        })
      }, 2800)
    }

    let node = document.getElementById("body")

    if(this.props.totalPixels !== node.scrollHeight) {
      this.props.updateTotalPixels(node.scrollHeight)
    }

  }

  handleScroll = (event) => {
    this.props.updateTotalScrolledPixels(document.getElementById("body").scrollTop)
  }

  componentDidMount() {
    let node = document.getElementById("body")
    window.addEventListener('scroll', this.handleScroll);
    this.props.updateTotalPixels(node.scrollHeight)
  }

	render() {
		return (
      <div className="of-grid-bottom-left">

        <div className="arrow-container">
          <div className="arrow-icon">
            <Arrow
              initialPose="exit"
              pose={this.state.arrowVisible ? "enter": "exit"}
            >
              <DoubleArrow/>
            </Arrow>
          </div>
        </div>

        <div className="scroll-message-container">

          <div className="scroll-message-title of-container">
            <div className="of-container">
              <Description
                initialPose="exit"
                pose={this.state.topLineVisible ? "enter": "exit"}
              >
                Scroll down
              </Description>
            </div>
          </div>

          <div className="scroll-message-description">
            <div className="of-container">
              <Description
                initialPose="exit"
                pose={this.state.topLineVisible ? "enter": "exit"}
              >
                Scrolled pixels:
                <span className="count-container">{this.props.totalScrolledPixels}</span>
                /
                <span className="count-container">{this.props.totalPixels}</span>
              </Description>
            </div>
          </div>
        </div>
      </div>
    )
	}
}

function mapStateToProps(state) {
	return {
    isVisible: state.app.appVisible,
    totalPixels: state.app.totalPixels,
    totalScrolledPixels: state.app.totalScrolledPixels,
    location: state.router.location
	};
}

export default connect(mapStateToProps, {updateTotalPixels, updateTotalScrolledPixels})(BottomLeft);
