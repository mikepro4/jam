import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import posed, { PoseGroup } from 'react-pose';


// Animation defaults

class Viz extends Component {
  state = {
    playDemo: true,
    play: true,
    points: [],
    test: 0,
    width: 0,
    height: 0,
    radius: 0,
    rotate: 0,
		rotate_speed_value: 0,
    rotate_speed: 0,
		friction_value: 0,
    friction: 0,
		speed_value: 0,
    speed: 0,
		step_value: 0,
    step: 0,
		freq_value: 0,
    freq: 0,
		bold_rate_value: 0,
    bold_rate: 0,
		math: "",
		pointSize: 0,
		pointOpacity: 0,
    x: 0,
    y: 0,
    radius: 0
  };

  componentDidMount = () => {
    // this.updateDimensions()
    this.updateDimensions()
    setTimeout(() => {
      this.setState({
        playDemo: false
      })
    }, 3000)
  }

  componentDidUpdate = (prevprops) => {

    // if(prevprops.player.jamId !== this.props.player.jamId) {
    //   this.setState({
    //     audioLoaded: false
    //   }, () => {
    //     this.update()
    //
    //   })
    // }

    if(prevprops.isZoomed !== this.props.isZoomed
      || prevprops.app.clientWidth !== this.props.app.clientWidth
      || prevprops.app.clientHeight !== this.props.app.clientHeight) {

      setTimeout(() => {

        if(this.props.isZoomed) {
          this.setState({
            width: this.props.app.clientWidth * 2,
            height: this.props.app.clientHeight * 2,
            radius: (this.props.app.clientWidth * 2) / 5,
            x: (this.props.app.clientWidth) * 2 / 2,
            y: (this.props.app.clientHeight) * 2 / 2
          }, () => {
            this.generatePoints()
            // this.setState({
            //   play: true
            // })
          })
        } else {
          this.setState({
            width: this.state.rectWidth * 2,
            height: this.state.rectHeight * 2,
            radius: (this.state.rectWidth * 2) / 5,
            x: (this.state.rectWidth) * 2 / 2,
            y: (this.state.rectHeight) * 2 / 2
          }, () => {
            this.generatePoints()
            // setTimeout(() => {
            //   this.setState({
            //     play: false
            //   })
            // }, 5000)
          })
        }

      }, 0)
    }
  }

  updateDimensions = () => {
    // setTimeout(() => {
    //   this.setState({
    //     play: false
    //   })
    // }, 5000)

    let rect = this.refs.viz_container.getBoundingClientRect();

    this.setState({
      width: rect.width * 2,
      height: rect.height * 2,
      radius: (rect.width * 2) / 5,
      rectWidth: rect.width * 2,
      rectHeight: rect.height * 2,
      rectRadius: (rect.width * 2) / 5
    }, () => {
      this.updateViz()
    })
  }

  updateViz = () => {

    let rect = this.refs.viz_container.getBoundingClientRect();

    const {
      rotateSpeed,
      friction,
      rotatePointSpeed,
      step,
      frequency,
      boldRate,
      math
    } = this.props.jam.defaultViz.shape

    const {
      pointSize,
      pointOpacity,
      pointCount,
      pointColor
    } = this.props.jam.defaultViz.point

    const {
      colorEnabled,
      colorValue,
      colorOpacity,
      gradientEnabled,
      gradientColorStops,
      gradientScale,
      gradientRotateDegree,
      gradientType
    } = this.props.jam.defaultViz.background

    this.setState({
      rotate_speed_value: rotateSpeed,
      rotate_speed: rotateSpeed * 0.1 + 0.001,
  		friction_value: friction,
      friction: friction * 0.8 + 0.1,
  		rotate_point_speed_value: rotatePointSpeed,
      rotate_point_speed: rotatePointSpeed * 0.2 + 0.03,
  		step_value: step,
      step: step * 0.5 + 0.0001,
  		freq_value: frequency,
      freq: frequency * 0.09 + 0.01,
  		bold_rate_value: boldRate,
      bold_rate: boldRate * 0.3 + 0.1,
  		math: math,
      pointSize: pointSize,
      pointCount: pointCount,
      pointOpacity: pointOpacity,
      x: (rect.width * 2) / 2,
      y: (rect.height * 2) / 2
    }, () => {
      console.log(this.state)
      this.paint()
    })
  }

  paint = () => {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d')
    ctx.width = this.state.width;
    ctx.height = this.state.height;
    let points = this.generatePoints()
    this.update();
  }

  generatePoints = () => {
    let points = []
    const pointsAmount = 2048
    for (var i = 0; i < pointsAmount; i++) {
      var pt = this.createPoint(
        Math.random(1) * this.state.width,
        Math.random(1) * this.state.height
      );
      points.push(pt)
    }
    this.setState({
      points: points
    }, () => {
      let canvas = this.refs.canvas;
      let ctx = canvas.getContext('2d')
      this.renderOnce(ctx)
    })

    return points
  }

  createPoint(x, y) {
    let point = {
      x: x,
      y: y,
      vx: 0,
      vy: 0
    }
    return point
  }

  update = () => {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d')
    this.renderFrame(ctx)
  }

  renderOnce = (ctx) => {
    // ctx.fillStyle = "rgba(0,0, 0, 0)";
		ctx.clearRect(0, 0, this.state.width, this.state.height);
    // ctx.fillRect(0, 0, this.state.width * 2, this.state.width * 2);

    this.setState({
      rotate: this.state.rotate + this.state.rotate_speed
    })

    let freqData = []

    if(this.props.player.analyser) {
      freqData = new Uint8Array(this.props.player.analyser.frequencyBinCount)
      this.props.player.analyser.getByteFrequencyData(freqData)
    }

    for (let i = 0; i < this.state.points.length; i++) {
      // console.log(freqData[i]/2)

			let soundModifier

      if(this.props.player.analyser) {
        if (i <= 1024) {
          soundModifier = freqData[i]/2
        } else {
          soundModifier = freqData[i-1024]/2
        }

        if(soundModifier == 0) {
          soundModifier = 1
        }
      } else {
        soundModifier = 1
      }

      let point = this.state.points[i];

			let t_radius

			if (this.state.math == "sin") {
				t_radius =
	        Math.sin(this.state.rotate * soundModifier + this.state.freq * i) * this.state.radius * this.state.bold_rate +
	        this.state.radius;
			} else if (this.state.math == "cos") {
				t_radius =
	        Math.cos(this.state.rotate * soundModifier + this.state.freq * i) * this.state.radius * this.state.bold_rate +
	        this.state.radius;
			} else if (this.state.math == "tan") {
				t_radius =
	        Math.tan(this.state.rotate * soundModifier + this.state.freq * i) * this.state.radius * this.state.bold_rate +
	        this.state.radius;
			} else if (this.state.math == "atan") {
				t_radius =
	        Math.atan(this.state.rotate * soundModifier + this.state.freq * i) * this.state.radius * this.state.bold_rate +
	        this.state.radius;
			} else if (this.state.math == "log") {
				t_radius =
	        Math.log(this.state.rotate * soundModifier + this.state.freq * i) * this.state.radius * this.state.bold_rate +
	        this.state.radius;
			}

      let tx = this.state.x + Math.cos(this.state.rotate + this.state.step * i) * t_radius;
      let ty = this.state.y + Math.sin(this.state.rotate + this.state.step * i) * t_radius;

      point.vx += (tx - point.x) * this.state.rotate_point_speed;
      point.vy += (ty - point.y) * this.state.rotate_point_speed;

      point.x += point.vx;
      point.y += point.vy;

      point.vx *= this.state.friction ;
      point.vy *= this.state.friction ;

      if (point.x >= 0 && point.x <= this.state.width && point.y >= 0 && point.y <= this.state.height) {
        // ctx.fillRect(point.x, point.y, this.state.pointSize, this.state.pointSize);
				ctx.beginPath();

				ctx.arc(point.x,point.y,this.state.pointSize,0,2*Math.PI);
				ctx.fillStyle = `rgba(255,255,255,${this.state.pointOpacity})`;
				ctx.fill();
      }
    }
  }

  renderFrame = (ctx) => {

    // if(this.state.playDemo) {
    //   this.renderOnce(ctx)
    // }

    if(this.props.jam._id == this.props.player.jamId) {
      this.renderOnce(ctx)
    }

    requestAnimationFrame(() => this.renderFrame(ctx));

  }

  saveImage = () => {
    var image = this.refs.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    console.log(image)
    // window.location.href=image;
  }

  setAudioContext = () => {
    // let audio = document.getElementById(`audio-${this.props.jam._id}`);
    //
    // if(audio) {
    //   this.setState({
    //     audioLoaded: true
    //   })
    //
    //   var AudioContext = window.AudioContext
    //   || window.webkitAudioContext
    //   || false;
    //   let context = new AudioContext();
    //   let analyser = context.createAnalyser();
    //   audio.crossOrigin = "anonymous";
    //   let audioSrc = context.createMediaElementSource(audio);
    //   audioSrc.connect(analyser);
    //   audioSrc.connect(context.destination);
    //
    //   console.log("set audio context")
    // }
  }

	render() {

		return (
      <div className="viz-container" ref="viz_container">
        <canvas
          ref="canvas"
          className="viz"
          width={this.state.width}
          height={this.state.height}
        />
        <button style={{position: "absolute", zIndex: 100000}} onClick={() => this.saveImage()}>save canvas</button>
      </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.app.user,
		location: state.router.location,
    app: state.app,
    player: state.player
	};
}

export default connect(mapStateToProps, {})(Viz);
