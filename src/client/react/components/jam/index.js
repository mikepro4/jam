import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import posed, { PoseGroup } from 'react-pose';

import {
	deleteJam
} from '../../../redux/actions/jamActions'

import Viz from '../viz/'

const transition = {
  duration: 400,
  ease: [0.08, 0.69, 0.2, 0.99]
};

const JamContainer = posed.div({
	init: {
    position: 'absolute',
    width: "100%",
		height: "100%",
    transition,
    flip: true,
  },
  zoom: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition,
    flip: true
  }
});

class Jam extends Component {
  state = {
    isZoomed: false
  }

	zoomIn() {
	  this.setState({ isZoomed: true });
	}

	zoomOut() {
	  this.setState({ isZoomed: false });
	}

	render() {
		const pose = this.state.isZoomed ? 'zoom' : 'init';

		return (
      <div className={classNames({
						"isZoomed" : this.state.isZoomed
					}, "jam-container")}
			>
				<JamContainer className="jam" pose={pose} onClick={() => this.state.isZoomed ? this.zoomOut() : this.zoomIn()}>
					<Viz jam={this.props.jam} isZoomed={this.state.isZoomed} />
					<div className={classNames({
						"isZoomed" : this.state.isZoomed
					}, "jam-content")}>
						{this.props.jam.metadata.artistName} – {this.props.jam.metadata.trackName}
						<button onClick={() => this.props.deleteJam(this.props.jam._id)}>Delete</button>
					</div>

					<audio
						id={`audio-${this.props.jam._id}`}
						ref="audio"
						controls={true}
						src={this.props.jam.metadata.audioUrl}
						onLoadedData={() => {
						}}
						>
					</audio>



				</JamContainer>

				<div className="audio-controls-container">
					<div>Duration: {this.refs.audio && this.refs.audio.duration}</div>
					<div>Current time: {this.refs.audio && this.refs.audio.currentTime}</div>
					<div onClick={() => {this.refs.audio.play()}}>play</div>
					<div onClick={() => {this.refs.audio.pause()}}>pause</div>
					<div onClick={() => {
						this.refs.audio.currentTime = 100
						this.refs.audio.play()
					}}>seek to 100</div>
				</div>





      </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.app.user,
		location: state.router.location
	};
}

export default connect(mapStateToProps, {deleteJam})(Jam);
