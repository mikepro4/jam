import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import SplitText from 'react-pose-text';
import classNames from "classnames"
import { Link } from "react-router-dom";
import posed from 'react-pose';

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

const Parent = posed.ul({
	enter: {staggerChildren: 100},
  exit: {},
	initialPose: 'closed'
});

const Child = posed.div({
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
 	},
	initialPose: 'closed'
});


class SectionHero extends Component {
	state = {
    isVisible: false
  };

  componentDidUpdate(prevprops) {
    if(this.props.isVisible == true && this.state.isVisible == false) {
      setTimeout(() => {
        this.setState({
          isVisible: true,
        })
      }, 500)
    }
  }

  componentDidMount() {
  }

	render() {

		return (
      <Parent
				initialPose="exit"
				pose={this.state.isVisible ? 'enter' : 'exit'}
				className="section-container section-hero"
			>
        <div className="of-grid-gutter-4 of-grid-13 hero-headline-container">

          <div className="hero-headline">
            <div className="hero-healine-textline">
              <div className="of-container">
								<Child>
									Instagram promotions,
								</Child>
							</div>
            </div>

            <div className="hero-healine-textline">
              <div className="of-container">
								<Child	>
									modeling, marketing
								</Child>
							</div>
            </div>

            <div className="hero-healine-textline">
              <div className="of-container">
								<Child>
									and design for the best
								</Child>
							</div>
            </div>

            <div className="hero-healine-textline">
              <div className="of-container">
								<Child>
									products and services
								</Child>
							</div>
            </div>
          </div>

          <Divider
						className="hero-divider"
						initialPose="exit"
						pose={this.state.dividerVisible ? "enter": "exit"}
					/>

          <div className="hero-description">
						<div className="hero-description-textline">
							<div className="of-container"><Child>My name is Olena Finch and I’m an actress, model and instagram influencer.</Child></div>
						</div>

						<div className="hero-description-textline">
							<div className="of-container"><Child>I like beauty products, art, fashion, music, design, photography, blockchain and technology,</Child></div>
						</div>

						<div className="hero-description-textline">
							<div className="of-container"><Child>and I help my friends on social media discover and experience the best products and services.</Child></div>
						</div>
          </div>
				</div>

        <div className="of-grid-row hero-buttons">
					<Child className="of-grid-3 of-grid-gutter-4">
            <Button
              buttonWhite={true}
              label="Get a promotion"
              title="Get a promotion"
            />
					</Child>

					<Child className="of-grid-3">
            <Button
              buttonWhite={true}
              buttonOutlined={true}
              label="View services"
              title="View services"
            />
					</Child>
        </div>
      </Parent>
    )
	}
}

function mapStateToProps({app}) {
	return {
  };
}

export default connect(mapStateToProps, {})(SectionHero);
