import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import posed, { PoseGroup } from 'react-pose';
import SplitText from 'react-pose-text';
import { Slider, Radio, RadioGroup, FileInput } from "@blueprintjs/core";
import axios from 'axios'
import Files from 'react-files'

import FileUploader from './FileUploader'


const defaulRotateSpeed = 0.001
const defaultFriction = 0.01
const defaultSpeed = 0.01
const defaultStep = 5
const defaultFreq = 0.0001
const defaultBoldRate = 1
const defaultWidth = 1000
const defaultHeight = defaultWidth
const defaultRadius = defaultWidth / 3

class Canvas extends Component {
	state = {
    points: [],
    test: 0,
    width: defaultWidth,
    height: defaultHeight,
    radius: defaultRadius,
    rotate: 0,
		rotate_speed_value: defaulRotateSpeed,
    rotate_speed: defaulRotateSpeed * 0.1 + 0.001,
		friction_value: defaultFriction,
    friction: defaultFriction * 0.8 + 0.1,
		speed_value: defaultSpeed,
    speed: defaultSpeed * 0.2 + 0.03,
		step_value: defaultStep,
    step: defaultStep * 0.5 + 0.0001,
		freq_value: defaultFreq,
    freq: defaultFreq * 0.09 + 0.01,
		bold_rate_value: defaultBoldRate,
    bold_rate: defaultBoldRate * 0.3 + 0.1,
		math: "cos",
		audioUrl: "/sounds/dcdnt.wav",
		pointSize: 3,
		pointOpacity: 1,
    // rotate_speed: 0.001,
    // friction:  0.001,
    // speed:  0.001,
    // step:  0.001,
    // freq:  0.001,
    // bold_rate:  0.001,
    x: defaultWidth/2,
    y: defaultHeight/2
  };

	renderHead = () => (
		<Helmet>
			<title>OF – Home Page</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
	)

  componentDidMount = () => {

		var request = new XMLHttpRequest();
	  request.open("GET", "http://localhost:3000/stream/zdImOoJSnt4", true);
	  request.responseType = "arraybuffer";

	  request.onload = function() {
	      var Data = request.response;
				console.log(Data)
	  };

	  request.send();
		// axios.get("http://localhost:3000/stream/zdImOoJSnt4", {
		//     responseType: 'arraybuffer',
		// }).then(function (response) {
		// });
    this.paint()
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
    })

    return points

  }

  paint = () => {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d')
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.width = this.state.width;
    ctx.height = this.state.height;
    let points = this.generatePoints()

    this.update();

    // ctx.fillRect(0, 0, ctx.width, ctx.height);
  }

  update = () => {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d')
		var AudioContext = window.AudioContext // Default
    || window.webkitAudioContext // Safari and old versions of Chrome
    || false;
    let context = new AudioContext();
    let analyser = context.createAnalyser();
    let audio = this.refs.audio;
		console.log(this.refs)
    audio.crossOrigin = "anonymous";

		// audio.autoplay = true;
		// audio.controls = true;
		//
		//   var audioSourceNode = context.createMediaElementSource(audio);
		//
		//   audioSourceNode.connect(analyser);
		//   analyser.connect(context.destination);
    let audioSrc = context.createMediaElementSource(audio);
    audioSrc.connect(analyser);
    audioSrc.connect(context.destination);
    this.renderFrame(ctx, analyser)
  }

  renderFrame = (ctx, analyser) => {
    // ctx.fillStyle = "rgba(0,0, 0, 0)";
		ctx.clearRect(0, 0, ctx.width, ctx.height);
    // ctx.fillRect(0, 0, this.state.width * 2, this.state.width * 2);

    this.setState({
      rotate: this.state.rotate + this.state.rotate_speed
    })

    let freqData = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(freqData)


    for (let i = 0; i < this.state.points.length; i++) {
      // console.log(freqData[i]/2)

			let soundModifier

			if (i <= 1024) {
				soundModifier = freqData[i]/2
			} else {
				soundModifier = freqData[i-1024]/2
			}

			if(soundModifier == 0) {
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

      point.vx += (tx - point.x) * this.state.speed;
      point.vy += (ty - point.y) * this.state.speed;

      point.x += point.vx;
      point.y += point.vy;

      point.vx *= this.state.friction ;
      point.vy *= this.state.friction ;

      if (point.x >= 0 && point.x <= this.state.width && point.y >= 0 && point.y <= this.state.height) {
        // ctx.fillRect(point.x, point.y, this.state.pointSize, this.state.pointSize);
				ctx.beginPath();

				ctx.arc(point.x,point.y,this.state.pointSize,0,2*Math.PI);
				ctx.fillStyle = `rgba(0,0,0,${this.state.pointOpacity})`;
				ctx.fill();
      }
    }

    requestAnimationFrame(() => this.renderFrame(ctx, analyser));

  }

   createVisualization = () => {
       // let context = new AudioContext();
       // let analyser = context.createAnalyser();
       // let canvas = this.refs.analyzerCanvas;
       // let ctx = canvas.getContext('2d');
       // let audio = this.refs.audio;
       // audio.crossOrigin = "anonymous";
       // let audioSrc = context.createMediaElementSource(audio);
       // audioSrc.connect(analyser);
       // audioSrc.connect(context.destination);
       //
       // function renderFrame(){
       //     let freqData = new Uint8Array(analyser.frequencyBinCount)
       //     requestAnimationFrame(renderFrame)
       //     analyser.getByteFrequencyData(freqData)
       //     canvas.width = 1024
       //     ctx.clearRect(0, 0, canvas.width, canvas.height)
       //     // console.log(freqData)
       //     ctx.fillStyle = '#9933ff';
       //     let bars = 1024;
       //     for (var i = 0; i < bars; i++) {
       //         let bar_x = i * 3;
       //         let bar_width = 2;
       //         let bar_height = -(freqData[i] / 2);
       //         ctx.fillRect(bar_x, canvas.height, bar_width, bar_height)
       //     }
       // };
       // renderFrame()
   }

	handleFileUpload = (file) => {
		console.log(file)
		this.setState({
			audioUrl: file
		})
	}


	render() {
		return (
      <div className="route-container route-canvas">

        <div className="of-grid-content-layer">

          <div className="screen">
            <div className="of-grid-row">
              <div
                className="of-grid-gutter-4 of-grid-5"
              >
								<FileUploader onComplete={(file) => this.handleFileUpload(file)} canUpload={true} />

                <audio
                  ref="audio"
                  autoPlay={true}
                  controls={true}
                  src={this.state.audioUrl}
									onLoadedData={() => {
										console.log(this.refs.audio.duration)
									}}
                  >
                  </audio>
									<div>Duration: {this.refs.audio && this.refs.audio.duration}</div>
									<div>Current time: {this.refs.audio && this.refs.audio.currentTime}</div>
									<div onClick={() => {this.refs.audio.play()}}>play</div>
									<div onClick={() => {this.refs.audio.pause()}}>pause</div>
									<div onClick={() => {
										this.refs.audio.currentTime = 100
										this.refs.audio.play()
									}}>seek to 100</div>
                <canvas
                  ref="canvas"
                  className="canvas"
                  width={this.state.width}
                  height={this.state.height}
                />

								<div className="slider">
									<div className="slider-title">rotate_speed</div>
									<Slider
											min={-1}
											max={1}
											stepSize={0.001}
											labelStepSize={10}
											onChange={(value) => {
												this.setState({
													rotate_speed_value: value,
													rotate_speed: value * 0.1 + 0.001
												})
											}}
											value={this.state.rotate_speed_value}
									/>
								</div>

								<div className="slider">
									<div className="slider-title">friction</div>
									<Slider
											min={-1}
											max={1}
											stepSize={0.001}
											labelStepSize={10}
											onChange={(value) => {
												this.setState({
													friction_value: value,
													friction: value * 0.8 + 0.1
												})
											}}
											value={this.state.friction_value}
									/>
								</div>

								<div className="slider">
									<div className="slider-title">speed</div>
									<Slider
											min={-1}
											max={1}
											stepSize={0.001}
											labelStepSize={10}
											onChange={(value) => {
												this.setState({
													speed_value: value,
													speed: value * 0.2 + 0.03
												})
											}}
											value={this.state.speed_value}
									/>
								</div>

								<div className="slider">
									<div className="slider-title">step</div>
									<Slider
											min={-10}
											max={10}
											stepSize={0.001}
											labelStepSize={10}
											onChange={(value) => {
												this.setState({
													step_value: value,
													step: value * 0.5 + 0.0001
												})
											}}
											value={this.state.step_value}
									/>
								</div>

								<div className="slider">
									<div className="slider-title">freq</div>
									<Slider
											min={-10}
											max={10}
											stepSize={0.001}
											labelStepSize={10}
											disabled={this.state.math == "log"}
											onChange={(value) => {
												this.setState({
													freq_value: value,
													freq: value * 0.09 + 0.01
												})
											}}
											value={this.state.freq_value}
									/>
								</div>

								<div className="slider">
									<div className="slider-title">bold_rate</div>
									<Slider
											min={-10}
											max={10}
											stepSize={0.001}
											labelStepSize={10}
											onChange={(value) => {
												this.setState({
													bold_rate_value: value,
													bold_rate: value * 0.3 + 0.1
												})
											}}
											value={this.state.bold_rate_value}
									/>
								</div>

								<div className="slider">
									<div className="slider-title">point size</div>
									<Slider
											min={0}
											max={20}
											stepSize={0.001}
											labelStepSize={10}
											onChange={(value) => {
												this.setState({
													pointSize: value,
												})
											}}
											value={this.state.pointSize}
									/>
								</div>

								<div className="slider">
									<div className="slider-title">point opacity</div>
									<Slider
											min={0}
											max={1}
											stepSize={0.001}
											labelStepSize={10}
											onChange={(value) => {
												this.setState({
													pointOpacity: value,
												})
											}}
											value={this.state.pointOpacity}
									/>
								</div>

								<RadioGroup
								 inline={this.state.inline}
								 label="Determine lunch"
								 name="group"
								 onChange={(event) => {
									  this.setState({
											math: event.target.value
										})
								 }}
								 selectedValue={this.state.math}
						 >
								 <Radio label="sin" value="sin" />
								 <Radio  label="cos" value="cos" />
								 <Radio  label="tan" value="tan" />
								 <Radio  label="atan" value="atan" />
								 <Radio  label="log" value="log" />
						 </RadioGroup>

              </div>
            </div>

          </div>

        </div>
      </div>
		);
	}
}

function mapStateToProps({ app }) {
	return {
    appVisible: app.appVisible
  };
}

export default {
	component: connect(mapStateToProps, {})(Canvas)
}
