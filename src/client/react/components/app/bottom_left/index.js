import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import SplitText from 'react-pose-text';
import classNames from "classnames"
import { Link } from "react-router-dom";
import posed, {PoseGroup} from 'react-pose';
import commaNumber from "comma-number"


import { updateTotalPixels, updateTotalScrolledPixels, setScrollTo} from "../../../../redux/actions/appActions";


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

const GreyBar = posed.div({
  exit: { width: 0},
  enter: {
    width: "100%",
    transition: {
     duration: 600,
	 }
  }
});

class BottomLeft extends Component {
	state = {
    totalVisible: false,
    scrolledVisible: false,
    greyBarVisible: false,
    clientHeight: 0,
    newScrollTo: 0,
    showGhostBar: false,
    hoverPercent: 0,
    topLineVisible: false
  };

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.props.updateTotalScrolledPixels(0)
    }

    if(this.props.isVisible == true && this.state.totalVisible == false) {

      setTimeout(() => {
        this.setState({
          topLineVisible: true
        })
      }, 700)

      setTimeout(() => {
        this.setState({
          greyBarVisible: true
        })
      }, 500)

      setTimeout(() => {
        this.setState({
          totalVisible: true
        })
      }, 1000)

      setTimeout(() => {
        this.setState({
          scrolledVisible: true
        })
      }, 1200)
    }

    let node = document.getElementById("body")

    if(this.props.totalPixels !== node.scrollHeight) {
      this.props.updateTotalPixels(node.scrollHeight, node.clientWidth, node.clientHeight)
    }

  }

  handleScroll = (event) => {
    this.props.updateTotalScrolledPixels(document.getElementById("body").scrollTop)
  }

  componentDidMount() {
    let node = document.getElementById("body")
    window.addEventListener('scroll', this.handleScroll);
    this.props.updateTotalPixels(node.scrollHeight, node.clientWidth, node.clientHeight)
    this.setState({
      clientHeight: node.clientHeight
    })

    window.addEventListener("resize", this.handleResize);
    setTimeout(() => {
      this.forceUpdate()
    }, 1)
  }

  handleResize = () => {
    let node = document.getElementById("body")
    this.props.updateTotalPixels(node.scrollHeight, node.clientWidth, node.clientHeight)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
  getLeft() {
    return (this.props.totalScrolledPixels*100)/(this.props.totalPixels-this.state.clientHeight)
  }
  getStyle() {
    if(this.props.totalScrolledPixels >0 ) {
      let left = this.getLeft()
      let barStyle = {
        transform: `translateX(${left}%)`
      }
      return barStyle
    }
  }

  getGhostBarStyle () {
    let barStyle = {
      transform: `translateX(${this.state.hoverPercent}%)`
    }
    return barStyle
  }

  scrollDown() {
    let scrollTo = this.props.totalScrolledPixels + this.state.clientHeight
    this.props.setScrollTo(scrollTo)
  }

  scrollToTop() {
    this.props.setScrollTo(1)
  }

  getDownBreak() {
    if(this.getLeft() < 90) {
      return (  <Description
          initialPose="exit"
          key="down"
          pose={this.state.topLineVisible ? "enter": "exit"}
        >
          <a onClick={() => this.scrollDown()}>SCROLL DOWN</a>
        </Description>)
    } else if (this.getLeft() > 90 && this.state.clientHeight < this.props.totalPixels + (this.state.clientHeight*0.1)) {
      return (<Description
          initialPose="exit"
          key="top"
          pose={this.state.topLineVisible ? "enter": "exit"}
        >
          <a onClick={() => this.scrollToTop()}>SCROLL TO TOP</a>
        </Description>)
    }


  }

  renderTicks = () => {
    if(this.refs.dividerContainer && (this.state.clientHeight > 0)) {
      let numberOfTicks =  Math.round(this.props.totalPixels / this.state.clientHeight)

      let ticks = []
        for (let i = 0; i < numberOfTicks; i++) {
          ticks.push(<div key={i} className="single-tick"/>)
        }
      return ticks
    }
  }

  calculateWidth(event) {
    const relX = event.pageX - (this.refs.dividerContainer.offsetLeft)
    const progressBarPercent = relX * 100 / this.refs.dividerContainer.getBoundingClientRect().width
    return progressBarPercent
  }

  onMouseMove(e) {
    let scrollToPixels = (this.props.totalPixels-this.state.clientHeight)*this.calculateWidth(e)/100

    this.setState({
      newScrollTo: scrollToPixels,
      showGhostBar: true,
      hoverPercent: this.calculateWidth(e)
    })
  }

  onMouseLeave() {
    this.setState({
      newScrollTo: 0,
      showGhostBar: false
    })
  }

	render() {
		return (
      <div className="of-grid-bottom-left">



        <div className="scroll-info-container">

          <div className="scroll-info-top">
            <div className="of-container">

              {this.getDownBreak()}

            </div>

          </div>

          <div className="scroll-info-divider-container" ref="dividerContainer">
            <div
              onMouseLeave={this.onMouseLeave.bind(this)}
              onMouseMove={this.onMouseMove.bind(this)}
              onClick={(e) => {
              console.log(this.calculateWidth(e))
              let scrollToPixels = (this.props.totalPixels-this.state.clientHeight)*this.calculateWidth(e)/100
              this.props.setScrollTo(scrollToPixels)
            }}>
              <div className="scroll-info-divider-bar" style={this.getStyle()}/>
              <GreyBar
                className="grey-bar"
                initialPose="exit"
                pose={this.state.greyBarVisible ? "enter" : "exit"}
              >
              </GreyBar>
              {this.state.showGhostBar && (<div className="scroll-info-ghost-bar" style={this.getGhostBarStyle()}/>)}
            </div>
          </div>

          <div className="scroll-info-sections">
            <div className="scroll-info-section">
              <div className="scroll-info-title">
                <div className="of-container">
                  <Description
                    initialPose="exit"
                    pose={this.state.totalVisible ? "enter": "exit"}
                    >
                    Total
                  </Description>
                </div>
              </div>

              <div className="scroll-info-value">
                <div className="of-container">
                  <Description
                    initialPose="exit"
                    pose={this.state.totalVisible ? "enter": "exit"}
                  >
                    <span>{commaNumber(this.props.totalPixels)}px</span>
                  </Description>
                </div>
              </div>
            </div>

            <div className="scroll-info-section">
              <div className="scroll-info-title">
                <div className="of-container">
                  <Description
                    initialPose="exit"
                    pose={this.state.scrolledVisible ? "enter": "exit"}
                  >
                    {this.state.newScrollTo > 0 ? "Scroll to" : "Scrolled"}
                  </Description>
                </div>
              </div>

              <div className="scroll-info-value">
                <div className="of-container">
                  <Description
                    initialPose="exit"
                    pose={this.state.scrolledVisible ? "enter": "exit"}
                  >
                    {this.state.newScrollTo > 0 ? (
                        <span className="highlighted-value">{commaNumber(Math.round(this.state.newScrollTo))}px</span>
                      ): (
                        <span >{commaNumber(Math.round(this.props.totalScrolledPixels))}px</span>
                      )}
                  </Description>
                </div>
              </div>
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

export default connect(mapStateToProps, {updateTotalPixels, updateTotalScrolledPixels, setScrollTo})(BottomLeft);
