import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import SplitText from 'react-pose-text';
import classNames from "classnames"
import { Link } from "react-router-dom";
import posed from 'react-pose';
import commaNumber from 'comma-number'

const Parent = posed.div({
	enter: {staggerChildren: 50, delayChildren: 0},
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

class SectionStatistics extends Component {

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

  renderStatisticsLine = (percent, label) => {
    return (
      <div className="statistics-line">

        <div className="statistics-line-info">
          <div className="statistics-line-label">
						<div className="of-container">
							<Child>
								{label}
							</Child>
						</div>
					</div>
          <div className="statistics-line-percent">
						<div className="of-container">
							<Child>
								{percent}%
							</Child>
						</div>
					</div>
        </div>

        <DividerContainer className="statistics-line-container">
          <div className="statistic-line-bar" style={{
            width: percent + "%"
          }}/>
        </DividerContainer>
      </div>
    )
  }

	render() {
		return (
      <div className="screen" ref="screen">

        <div className="section-container section-statistics">

          <Parent
            initialPose="exit"
            pose={this.getPose()}
            className="steps-container"
          >

            <div className="of-grid-gutter-4 of-grid-9">
              <div className="statistics-title">
								<div className="of-container">
									<Child>
										Statistics
									</Child>
								</div>
							</div>
            </div>

            <div className="of-grid-row">
              <div className="of-grid-gutter-4 of-grid-5">
                <div className="statistics-section-title">
									<div className="of-container">
										<Child>
											Total followers
										</Child>
									</div>
								</div>
                <div className="statistics-section-value">
									<div className="of-container">
										<Child>
											{commaNumber(200000)}
										</Child>
									</div>
								</div>
              </div>

              <div className="of-grid-5">
                <div className="statistics-section-title">
									<div className="of-container">
										<Child>
											Total likes
										</Child>
									</div>
								</div>
                <div className="statistics-section-value">
									<div className="of-container">
										<Child>
											2,500,000+
										</Child>
									</div>
								</div>
              </div>
            </div>

            <div className="of-grid-gutter-4 of-grid-9">
              <DividerContainer className="divider-container"/>
            </div>

            <div className="of-grid-row">
              <div className="of-grid-gutter-4 of-grid-5">
                <div className="statistics-section-title">
									<div className="of-container">
										<Child>
											Likes per inatagram post
										</Child>
									</div>
								</div>
                <div className="statistics-section-value">
									<div className="of-container">
										<Child>
											5,000-20,000
										</Child>
									</div>
								</div>
              </div>

              <div className="of-grid-5">
                <div className="statistics-section-title">
									<div className="of-container">
										<Child>
											View per instagram story
										</Child>
									</div>
								</div>
                <div className="statistics-section-value">
									<div className="of-container">
										<Child>
											5,000-100,000
										</Child>
									</div>
								</div>
              </div>
            </div>

            <div className="of-grid-gutter-4 of-grid-9">
              <DividerContainer className="divider-container"/>
            </div>

            <div className="of-grid-row">
              <div className="of-grid-gutter-4 of-grid-5">
                <div className="statistics-section-title">
									<div className="of-container">
										<Child>
											Women audience
										</Child>
									</div>
								</div>
                <div className="statistics-section-value">
									<div className="of-container">
										<Child>
											35%
										</Child>
									</div>
								</div>
              </div>

              <div className="of-grid-5">
                <div className="statistics-section-title">
									<div className="of-container">
										<Child>
											Men audience
										</Child>
									</div>
								</div>
                <div className="statistics-section-value">
									<div className="of-container">
										<Child>
											65%
										</Child>
									</div>
								</div>
              </div>
            </div>

            <div className="of-grid-gutter-4 of-grid-9">
              <DividerContainer className="divider-container"/>
            </div>

            <div className="of-grid-row">
              <div className="of-grid-gutter-4 of-grid-4">
                <div className="statistics-section-title">
									<div className="of-container">
										<Child>
											Women demographics
										</Child>
									</div>
								</div>
                {this.renderStatisticsLine(100, "18-25")}
                {this.renderStatisticsLine(65, "18-25")}
                {this.renderStatisticsLine(35, "18-25")}
                {this.renderStatisticsLine(5, "18-25")}
              </div>

              <div className="of-grid-gutter-1 of-grid-4">
                <div className="statistics-section-title">
									<div className="of-container">
										<Child>
											Men demographics
										</Child>
									</div>
								</div>
                {this.renderStatisticsLine(100, "18-25")}
                {this.renderStatisticsLine(65, "18-25")}
                {this.renderStatisticsLine(35, "18-25")}
                {this.renderStatisticsLine(5, "18-25")}
              </div>
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
    clientHeight: app.clientHeight,
		followers: app.userDetails.followers
  };
}

export default connect(mapStateToProps, {})(SectionStatistics);
