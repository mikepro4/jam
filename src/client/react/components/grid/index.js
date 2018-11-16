import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Intent } from "@blueprintjs/core";
import classNames from "classnames";
import ReactDOM from "react-dom";

class Grid extends Component {
	calcClientXPercent = () => {
		let percent = this.props.clientX * 100 / this.props.clientWidth

		return Math.round(percent)
	}

	calcClientYPercent = () => {

		let percent = this.props.clientY * 100 / this.props.clientWidth

		return Math.round(percent)
	}

	calcPageYPercent = () => {
		let percent = this.props.pageY * 100 / this.props.totalPixels

		return Math.round(percent)
	}
	render() {

		let guideXStyle = {
			top: this.props.clientY + "px"
		}
		let guideYStyle = {
			left: this.props.clientX + "px"
		}
		let left = this.props.clientWidth - this.props.clientX < 340

		let tooltipStyle = {}

		if(left) {
			tooltipStyle = {
				top: this.props.clientY + 10 + "px",
				left: this.props.clientX - 330 + "px"
			}
		} else {
			tooltipStyle = {
				top: this.props.clientY + 10 + "px",
				left: this.props.clientX + 10 + "px"
			}
		}

		return (
  			<div
					className={classNames({
						"grid-visible": this.props.gridVisible,
						"top": this.props.gridOnTop
					}, "of-grid of-grid-preview")}
				>

					{this.props.gridVisible ? (
						<div>
							<div className="guide-x" style={guideXStyle} />
							<div className="guide-y" style={guideYStyle}/>
							<div className={
								classNames({"left-tooltip": left }, "cursor-tooltip")
							}
								style={tooltipStyle}
							>
								<div className="tooltip-row">
									<div className="cursor-tooltip-value"><span>ClientX:</span> {this.props.clientX}</div>
									<div className="cursor-tooltip-value"><span>ClientY:</span> {this.props.clientY}</div>
									<div className="cursor-tooltip-value"><span>PageY:</span> {this.props.pageY}</div>
								</div>

								<div className="tooltip-row">
									<div className="cursor-tooltip-value"><span>ClientX:</span> {this.calcClientXPercent()}%</div>
									<div className="cursor-tooltip-value"><span>ClientY:</span> {this.calcClientYPercent()}%</div>
									<div className="cursor-tooltip-value"><span>PageY:</span> {this.calcPageYPercent()}%</div>
								</div>

								<div className="tooltip-row">
									<div className="cursor-tooltip-value"><span>ClientHeight:</span> {this.props.clientHeight}</div>
									<div className="cursor-tooltip-value"><span>ClientWidth:</span> {this.props.clientWidth}</div>
								</div>
							</div>
						</div>
					): ""}

          <div className="of-grid-container">
            <div className="of-grid-1"></div>
            <div className="of-grid-1"></div>
            <div className="of-grid-1"></div>
            <div className="of-grid-1"></div>
            <div className="of-grid-1"></div>
            <div className="of-grid-1"></div>
            <div className="of-grid-1"></div>
            <div className="of-grid-1"></div>
            <div className="of-grid-1"></div>
            <div className="of-grid-1"></div>
            <div className="of-grid-1"></div>
            <div className="of-grid-1"></div>
            <div className="of-grid-1"></div>
            <div className="of-grid-1"></div>
            <div className="of-grid-1"></div>
            <div className="of-grid-1"></div>
            <div className="of-grid-1"></div>
            <div className="of-grid-1"></div>
            <div className="of-grid-1"></div>
            <div className="of-grid-1"></div>
          </div>
        </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		totalPixels: state.app.totalPixels,
		location: state.router.location,
		gridVisible: state.app.gridVisible,
		clientHeight: state.app.clientHeight,
		clientWidth: state.app.clientWidth
	};
}

export default connect(mapStateToProps, {})(Grid);
