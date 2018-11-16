import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import SplitText from 'react-pose-text';
import classNames from "classnames"
import { Link } from "react-router-dom";
import posed from 'react-pose';


const Parent = posed.div({
	enter: {staggerChildren: 150, delayChildren: 0},
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

        <div className="section-container section-payment">
          <div className="of-grid-gutter-10 of-grid-9">

            <Parent
              initialPose="exit"
              pose={this.getPose()}
              className="payment-description"
            >

              <div className="payment-headline">
                <div className="of-container">
                  <Child>
                    Payment
                  </Child>
                </div>
              </div>

              <div className="payment-line">
                <div className="of-container">
  								<Child>
  									I promise to negotiate with you the payment arrangement that will suit your budget.
                  </Child>
  							</div>
              </div>

              <div className="payment-line">
                <div className="of-container">
  								<Child>
  									If you have a substantial following and will be ready to promote me in return I may work with you for free.
                  </Child>
  							</div>
              </div>

              <div className="payment-line">
                <div className="of-container">
  								<Child>
  									I accept Paypal, Venmo and all major cryptocurrencies such as BTC, ETH, LTC, XRP, 0x and others.
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
