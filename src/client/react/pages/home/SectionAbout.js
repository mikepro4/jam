import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import SplitText from 'react-pose-text';
import classNames from "classnames"
import { Link } from "react-router-dom";
import posed from 'react-pose';


const Parent = posed.div({
	enter: {staggerChildren: 350, delayChildren: 0},
  exit: {},
	initialPose: 'closed'
});


const Child = posed.div({
	exit: {
    translateY: 50,
    opacity: 0
  },
  enter: {
    translateY: 0,
    opacity: 1,
    transition: {
     duration: 600,
	 }
 	},
	initialPose: 'closed'
});

const DividerContainer = posed.div({
	exit: {
    width: 0,
  },
  enter: {
    width: "100%",
    transition: {
     duration: 600,
	 }
 	},
	initialPose: 'closed'
});

class SectionHero extends Component {
	state = {
  };

  componentDidMount() {
  }

	getPose() {
    if(this.refs.screen) {
      let node = this.refs.screen
      let bodyHeight = this.props.clientHeight
      if(node && (this.refs.screen.offsetTop <= ( this.props.totalScrolledPixels + (bodyHeight/1.5)))) {
        return "enter"
      } else {
        return "exit"
      }
    } else {
      return "exit"
    }
  }

	render() {
		return (
      <div className="screen" ref="screen">

        <div className="section-container section-about">
          <div className="of-grid-gutter-10 of-grid-9 hero-headline-container">

            <Parent
              initialPose="exit"
              pose={this.getPose()}
              className="about-description"
            >
							<DividerContainer className="divider-container"/>

              <div className="about-description-line">
                <div className="of-container">
  								<Child>
  									My name is Olena Finch and I’m an actress, model and instagram influencer.
                    I like beauty products, art, fashion, music, design, photography, blockchain and technology,
                    and I help my friends on social media discover and experience the best products and services.
  								</Child>
  							</div>
              </div>

              <div className="about-description-line">
                <div className="of-container">
  								<Child>
  									Something smaller here but it has to be 2 lines so I'll write that.
										Something smaller here but it has to be 2 lines so I'll write that.
									</Child>
  							</div>
              </div>
            </Parent>
          </div>
        </div>
      </div>
    )
	}
}

function mapStateToProps({app}) {
	return {
		totalScrolledPixels: app.totalScrolledPixels,
    clientHeight: app.clientHeight
  };
}

export default connect(mapStateToProps, {})(SectionHero);
