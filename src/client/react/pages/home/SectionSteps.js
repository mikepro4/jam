import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import SplitText from 'react-pose-text';
import classNames from "classnames"
import { Link } from "react-router-dom";
import posed from 'react-pose';

import Button from "../../components/uikit/Button"

const Parent = posed.div({
	enter: {staggerChildren: 60, delayChildren: 0},
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

const ButtonContainer = posed.div({
	exit: {
    scale: 0.95,
    opacity: 0
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
     duration: 2000,
	 }
 	},
	initialPose: 'closed'
});

class SectionSteps extends Component {
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

        <div className="section-container section-steps">

          <Parent
            initialPose="exit"
            pose={this.getPose()}
            className="steps-container"
          >

            <div className="of-grid-gutter-4 of-grid-14">
              <div className="steps-headline-container">
                <div className="steps-headline-line">
                  <div className="of-container">
                    <Child> If your product is great </Child>
                  </div>
                </div>

                <div className="steps-headline-line">
                  <div className="of-container">
                    <Child> I'll help you promote it to </Child>
                  </div>
                </div>

                <div className="steps-headline-line">
                  <div className="of-container">
                    <Child> 200K potential customers</Child>
                  </div>
                </div>
              </div>
            </div>

            <div className="of-grid-row">
              <div className="of-grid-gutter-4 of-grid-4 single-step">
                <div className="step-count">
                  <div className="of-container">
                    <Child> Step 1</Child>
                  </div>
                </div>

                <div className="step-name">
                  <div className="of-container">
                    <Child> Describe your business</Child>
                  </div>
                </div>

                <DividerContainer className="divider-container"/>

                <div className="step-description">
                  <div className="of-container">
                    <Child>
                      My name is Olena Finch and I’m an instagram model and bla bla bla and bla.
                      I like beauty products, art, fashion, music, design, photography, blockchain and technology,
                      and I help my friends on social media discover and experience the best products and services.
                    </Child>
                  </div>
                </div>
              </div>

              <div className="of-grid-gutter-1 of-grid-4 single-step">
                <div className="step-count">
                  <div className="of-container">
                    <Child>Step 2</Child>
                  </div>
                </div>

                <div className="step-name">
                  <div className="of-container">
                    <Child> Schedule photoshoot</Child>
                  </div>
                </div>

                <DividerContainer className="divider-container"/>

                <div className="step-description">
                  <div className="of-container">
                    <Child>
                      My name is Olena Finch and I’m an instagram model and bla bla bla and bla.
                      I like beauty products, art, fashion, music, design, photography, blockchain and technology,
                      and I help my friends on social media discover and experience the best products and services.
                    </Child>
                  </div>
                </div>
              </div>

              <div className="of-grid-gutter-1 of-grid-4 single-step">
                <div className="step-count">
                  <div className="of-container">
                    <Child>Step 3</Child>
                  </div>
                </div>

                <div className="step-name">
                  <div className="of-container">
                    <Child>Reach new customers</Child>
                  </div>
                </div>

                <DividerContainer className="divider-container"/>

                <div className="step-description">
                  <div className="of-container">
                    <Child>
                      My name is Olena Finch and I’m an instagram model and bla bla bla and bla.
                      I like beauty products, art, fashion, music, design, photography, blockchain and technology,
                      and I help my friends on social media discover and experience the best products and services.
                    </Child>
                  </div>
                </div>
              </div>
            </div>

            <div className="of-grid-gutter-4 of-grid-14 button-container">
              <ButtonContainer>
                <Button
                  buttonWhite={true}
                  label="Get a promotion"
                />
              </ButtonContainer>
            </div>

          </Parent>
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

export default connect(mapStateToProps, {})(SectionSteps);
