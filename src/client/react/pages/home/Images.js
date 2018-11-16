import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import SplitText from 'react-pose-text';
import classNames from "classnames"
import { Link } from "react-router-dom";
import posed from 'react-pose';

import Image from "./Image"

class Images extends Component {
	state = {
    isVisible: false
  };

  componentDidUpdate(prevprops) {
    if(this.props.isVisible == true && this.state.isVisible == false) {
      this.setState({
        isVisible: true
      })
    }
  }

	render() {
		return (
      <div className="of-grid-images">
        <Image
					isVisible={this.state.isVisible}
					className="image-1"
					imageId="BZLsOxXFLGS"
					top={150}
					height={600}
					screen={0}
					slowDown={6}
					order={1}
				/>

				<Image
					isVisible={this.state.isVisible}
					className="image-2"
					imageId="BpnjJjZlLrL"
					top={650}
					height={350}
					screen={0}
					slowDown={7}
					order={2}
				/>

				<Image
					isVisible={this.state.isVisible}
					className="image-3"
					imageId="BllohYGFEpN"
					top={150}
					height={770}
					screen={1}
					order={4}
				/>

				<Image
					isVisible={this.state.isVisible}
					className="image-4"
					imageId="BjN1KM_FwrH"
					top={250}
					square={true}
					screen={1}
					slowDown={12}
					order={1}
				/>

				<Image
					isVisible={this.state.isVisible}
					className="image-5"
					imageId="BnP71eRlU0F"
					top={330}
					height={340}
					screen={1}
					slowDown={5}
					order={2}
				/>

				<Image
					isVisible={this.state.isVisible}
					className="image-6"
					imageId="BlgxEIHlLK7"
					top={150}
					height={400}
					screen={1}
					order={3}
					slowDown={7}
				/>

				<Image
					isVisible={this.state.isVisible}
					className="image-7"
					imageId="BpXPT3ulrU6"
					top={0}
					height={450}
					screen={2}
					slowDown={6}
					order={1}
				/>

				<Image
					isVisible={this.state.isVisible}
					className="image-8"
					imageId="BjX8wJIlTcT"
					top={-550}
					height={590}
					screen={4}
					slowDown={5}
					order={1}
				/>

				<Image
					isVisible={this.state.isVisible}
					className="image-9"
					imageId="BqAuaVqleZQ"
					top={-400}
					height={900}
					screen={5}
					slowDown={8}
					order={1}
				/>
      </div>
    )
	}
}

function mapStateToProps({app}) {
	return {
	};
}

export default connect(mapStateToProps, {})(Images);
