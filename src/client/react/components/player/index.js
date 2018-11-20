import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import posed, { PoseGroup } from 'react-pose';

import {
	trackPlaying
} from '../../../redux/actions/playerActions'

class Jam extends Component {
  state = {
    status: null
  }

  componentDidUpdate = (prevprops) => {
    if(prevprops.player.jamId !== this.props.player.jamId) {
      this.refs.audio.currentTime = 0
    }

    if(
      prevprops.player.seekToSeconds !== this.props.player.seekToSeconds
      && this.props.player.seekToSeconds > 0
    ) {
      this.refs.audio.currentTime = this.props.player.seekToSeconds
      this.play()
    }

    if(prevprops.player.status !== this.props.player.status) {
      this.changeStatus(this.props.player.status)
    }
  }

  changeStatus = (status) => {
    switch (status) {
      case "play":
  			return this.play()
      case "pause":
  			return this.pause()
      case "stop":
        return this.stop()
  		default:
  			return
    }
  }

  play = () => {
    console.log("play audio")

    this.refs.audio.play()
  }

  pause = () => {
    console.log("pause");
    this.refs.audio.pause()
  }

  stop = () => {
    console.log("stop")
    this.refs.audio.pause()
    this.refs.audio.currentTime = 0
  }

  playing = () => {
    console.log("playing", this.refs.audio.currentTime)
    this.props.trackPlaying(
      this.props.player.jamId,
      this.refs.audio.currentTime,
      this.props.player.trackMetadata
    )
  }

	render() {
		return (
      <div>
      {this.props.player.jamId ? (
        <audio
          id={`audio-${this.props.player.jamId}`}
          ref="audio"
          controls={true}
          src={this.props.player.trackMetadata.audioUrl}
          onTimeUpdate={() => {
            this.playing()
          }}
          onLoadedData={() => {
          }}
          >
        </audio>
      ): ""}

      </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.app.user,
		location: state.router.location,
    player: state.player
	};
}

export default connect(mapStateToProps, {trackPlaying})(Jam);
