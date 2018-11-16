import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import SplitText from 'react-pose-text';
import classNames from "classnames"
import { Link } from "react-router-dom";
import posed from 'react-pose';

import Profile from "./Profile"
import Button from "../../components/uikit/Button"

const Divider = posed.div({
  exit: {
    width: 0
  },
  enter: {
    width: "90px",
    transition: {
     duration: 600,
	 }
  }
});

const Parent = posed.div({
	enter: {staggerChildren: 350},
  exit: {},
	initialPose: 'closed'
});

const ButtonGroupContainer = posed.div({
	enter: {staggerChildren: 500},
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


class SectionHero extends Component {
	state = {
    isVisible: false,
    isProfileVisible: false,
    isButtonGroupVisible: false
  };

  componentDidUpdate(prevprops) {
    if(this.props.isVisible == true && this.state.isVisible == false && this.state.isProfileVisible == false) {

      this.setState({
        isProfileVisible: true,
      })

      setTimeout(() => {
        this.setState({
          isVisible: true,
        })
      }, 500)

      setTimeout(() => {
        this.setState({
          isButtonGroupVisible: true,
        })
      }, 2500)
    }
  }

  componentDidMount() {
  }

	render() {

		return (
      <div className="screen">

        <Profile isVisible={this.state.isProfileVisible} />

        <div className="section-container section-hero">
          <div className="of-grid-gutter-4 of-grid-13 hero-headline-container">

            <Parent
              initialPose="exit"
              pose={this.state.isVisible ? 'enter' : 'exit'}
              className="hero-headline"
            >
              <div className="hero-healine-textline">
                <div className="of-container">
  								<Child>
  									Promotions
  								</Child>
  							</div>
              </div>

              <div className="hero-healine-textline">
                <div className="of-container">
  								<Child	>
  									Modeling
  								</Child>
  							</div>
              </div>

              <div className="hero-healine-textline">
                <div className="of-container">
  								<Child>
  									Marketing
  								</Child>
  							</div>
              </div>

              <div className="hero-healine-textline">
                <div className="of-container">
  								<Child>
  									Design
  								</Child>
  							</div>
              </div>
            </Parent>
          </div>

          <ButtonGroupContainer
            initialPose="exit"
            pose={this.state.isButtonGroupVisible ? 'enter' : 'exit'}
            className="section-container section-hero"
          >

            <div className="of-grid-row hero-buttons">
              <ButtonContainer className="of-grid-3 of-grid-gutter-4">
                <Button
                  buttonWhite={true}
                  label="Get a promotion"
                  title="Get a promotion"
                />
              </ButtonContainer>

              <ButtonContainer className="of-grid-3">
                <Button
                  buttonWhite={true}
                  buttonOutlined={true}
                  label="View services"
                  title="View services"
                />
              </ButtonContainer>
            </div>
          </ButtonGroupContainer>

        </div>
      </div>
    )
	}
}

function mapStateToProps({app}) {
	return {
  };
}

export default connect(mapStateToProps, {})(SectionHero);
