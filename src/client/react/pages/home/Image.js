import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import SplitText from 'react-pose-text';
import classNames from "classnames"
import { Link } from "react-router-dom";
import posed from 'react-pose';
import commaNumber from "comma-number"

import { fetchImageDetails } from "../../../redux/actions/appActions";

import Heart from "../../components/svg/heart"

const ImageContainer = posed.div({
  exit: {
    opacity: 0,
    scale: 1.1,
    translateY: 30
  },
  enter: {
    opacity: 1,
    scale: 1,
    translateY: 0,
    transition: {
      scale: {
        duration: 3000
      },
      opacity: {
        duration: 2000,

      },
      translateY: {
        duration: 2000,
        easing: "cubic-bezier(.19,1,.22,1)"
      },
	 },
   delay: ({order}) => {
      return order * 300
   }
  }
});

class Image extends Component {
	state = {
    isVisible: false,
  };

  componentDidUpdate(prevprops) {
    if(this.props.isVisible == true && this.state.isVisible == false) {
      this.setState({
        isVisible: true
      })
    }
  }

  componentDidMount() {
    if(!this.props.loadedImages[this.props.imageId]) {
      this.props.fetchImageDetails(this.props.imageId, this.props.order)
    }
  }

  getPose() {
    if(this.props.loadedImages[this.props.imageId] && this.refs.image_container) {
      let node = this.refs[this.props.imageId]
      let bodyHeight = document.getElementById("body").clientHeight
      if( this.state.isVisible && node && (this.refs.image_container.offsetTop <= ( this.props.totalScrolledPixels + (bodyHeight/0.9)))) {
        return "enter"
      } else {
        return "exit"
      }
    } else {
      return "exit"
    }
  }

  getScreenHeight = () => {
    if(this.props.screen) {
      if(this.props.screen == 0) {
        return 1
      } else {
        let screenHeight = this.props.clientHeight

        if(this.props.clientHeight <= 970) {
          screenHeight = 970
        }

        return screenHeight * this.props.screen
      }
    } else {
      return 1
    }
  }

  calcTop = () => {
    if (this.props.top) {
      let originalTop = this.props.top * 100 / this.getScreenHeight();
      let newTop = originalTop * this.getScreenHeight() / 100
      if(this.props.clientHeight > 1200) {
        return newTop + 0
      } else {
        return newTop
      }
    } else {
      return 0
    }

  }

  getHeight = () => {
    if(this.refs.image_container) {
      if(this.props.square ) {
        return this.refs.image_container.clientWidth
      } else {
        let height = (this.props.height * 100) / 970;
        let screenHeight = this.props.clientHeight

        if(this.props.clientHeight <= 970) {
          screenHeight = 970
        }

        let newHeight = (height * screenHeight) / 100
        return newHeight
      }
    }
  }

  imageTransform = () => {
    let transform =  `translateY(0px)`;

    if (this.props.slowDown) {
      transform = `translateY(${this.props.totalScrolledPixels /this.props.slowDown}px)`
    }

    return transform
  }

  mayberRenderImage() {
    if(this.props.loadedImages[this.props.imageId] && this.refs.image_container) {
        return (
          <div className="image-wrapper"
            ref={this.props.imageId}
            style={{
              backgroundImage: `url(${this.props.loadedImages[this.props.imageId].imageDetails.display_resources[2].src})`
            }}
          >
            <span className="info">
              {this.props.className} – {this.props.imageId} - {this.refs.image_container.offsetTop}
            </span>
          </div>
        )
      }
  }

	render() {
      return (
        <div
          className={classNames({"of-grid-image": true}, this.props.className)}
          style={{
           top: `calc(${this.getScreenHeight()}px + ${this.calcTop()}px)`,
           height: this.getHeight() + "px",
           transform: this.imageTransform()
          }}
         ref="image_container"
        >

          {this.props.showLikes && this.props.loadedImages[this.props.imageId] ? (
              <div className="image-likes-count">
                <Heart color="white" />
                {commaNumber(this.props.loadedImages[this.props.imageId].imageDetails.edge_media_preview_like.count)}
              </div>
            ) : ""
          }

          <ImageContainer
            initialPose="exit"
            className="image-container"
            order={this.props.order}
            pose={this.getPose()}
          >
            {this.mayberRenderImage()}
          </ImageContainer>
        </div>
      )

	}
}

function mapStateToProps({app}) {
	return {
    userDetails: app.userDetails,
    loadedImages: app.loadedImages,
    totalScrolledPixels: app.totalScrolledPixels,
    clientHeight: app.clientHeight,
    clientWidth: app.clientWidth
	};
}

export default connect(mapStateToProps, {fetchImageDetails})(Image);
