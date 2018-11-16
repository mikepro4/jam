import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import SplitText from 'react-pose-text';
import classNames from "classnames"
import { Link } from "react-router-dom";
import posed from 'react-pose';

import Image from "./Image"

import ArrowRight from "../../components/svg/arrow_right"

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

class SectionOpportunities extends Component {
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

  getImageHeight = () => {
    if(this.refs.opportunity_container) {
      return this.refs.opportunity_container.clientWidth
    } else {
      return 0
    }
  }

  getMarginBottom = () => {
    if(this.refs.opportunity_container) {
      return (this.refs.opportunity_container.clientWidth - 30) / 4 + 20
    } else {
      return 0
    }
  }

  renderOpportunitiyContainer = (imageId, showLikes, content) => {
    return (
      <div
        className="opportunity-container"
        style={{
          marginBottom: this.getMarginBottom() + "px",
          height: imageId ? this.getImageHeight() + 185 + "px" : "185px"
        }}
      >

        {imageId ? (
          <div
            style={{
              height: this.getImageHeight() + "px"
            }}
            className="opportunity-image-container"
          >
            <a href={`https://www.instagram.com/p/${imageId}/`} target="_blank" className="intagram-link"/>
            <Image
              isVisible={true}
              className="opportunity-image"
              imageId={imageId}
              showLikes={showLikes}
            />
            <div className="view-link">View on Instagram</div>
          </div>
        ) : ""}

        {content}

      </div>
    )
  }

  renderOpportunity = (imageId, link, title, showLikes) => {
    return(
      <div>
        {this.renderOpportunitiyContainer(imageId, showLikes, (
          <Link to={link} className="opportunity-description-container">
            <div className="opportunity-description-bg"/>

            <div className="opportunity-description">
              {title}
            </div>

            <div className="learn-more-container">
              <div className="learn-more">
                <div className="learn-more-text">Learn more</div>
                <div className="learn-more-arrow-container">
                  <div className="learn-more-arrow">
                    <ArrowRight/>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )
  }

	render() {
		return (
      <div className="section-container section-opportunities" ref="screen">
        <div className="of-grid-gutter-4 of-grid-14">

          <div className="opportunities-headline">
            Opportunities Im interested in:
          </div>
        </div>

        <div className="of-grid-row">
          <div className="of-grid-gutter-4 of-grid-4" ref="opportunity_container">
            {this.renderOpportunity(
              "BmCuDhGF1X3",
              "/services/something",
              "Photoshoots with professional photographers",
              true
            )}
          </div>

          <div className="of-grid-gutter-1 of-grid-4">
            {this.renderOpportunity(
              "BcIid3jFFy_",
              "/services/something",
              "Modeling for fashion agencies and magazines"
            )}
          </div>

          <div className="of-grid-gutter-1 of-grid-4">
            {this.renderOpportunity(
              "BppnsZIleRm",
              "/services/something",
              "Promotions for health and beuaty products and services",
              true
            )}
          </div>
        </div>

        <div className="of-grid-row">
          <div className="of-grid-gutter-4 of-grid-4" ref="opportunity_container">
            {this.renderOpportunity(
              "BGlbvcFK6g9",
              "/services/something",
              "Promotions for florists and flower delivery services"
            )}
          </div>

          <div className="of-grid-gutter-1 of-grid-4">
            {this.renderOpportunity(
              "Bbnct52lJbK",
              "/services/something",
              "Promotions for massagists, yoga and fitness trainers",
              true
            )}
          </div>

          <div className="of-grid-gutter-1 of-grid-4">
            {this.renderOpportunity(
              "BVnKNvsFJli",
              "/services/something",
              "Modeling for marketing and ad campaigns"
            )}
          </div>
        </div>

        <div className="of-grid-row">
          <div className="of-grid-gutter-4 of-grid-4" ref="opportunity_container">
            {this.renderOpportunity(
              "BiZ-NlXlgXT",
              "/services/something",
              "Promotions for hair stylists and make-up artists",
              true
            )}
          </div>

          <div className="of-grid-gutter-1 of-grid-4">
            {this.renderOpportunity(
              "1cJEIoK6g7",
              "/services/something",
              "Promotions for tattoo artists"
            )}
          </div>

          <div className="of-grid-gutter-1 of-grid-4">
            {this.renderOpportunity(
              "BXGOAr2Fdaf",
              "/services/something",
              "Modeling and promotions for clothing brands"
            )}
          </div>
        </div>

        <div className="of-grid-row">
          <div className="of-grid-gutter-4 of-grid-4" ref="opportunity_container">
            {this.renderOpportunity(
              null,
              "/services/something",
              "Modeling and promotions for clothing brands"
            )}
          </div>

          <div className="of-grid-gutter-1 of-grid-4">
            {this.renderOpportunity(
              null,
              "/services/something",
              "Modeling and promotions for clothing brands"
            )}
          </div>

          <div className="of-grid-gutter-1 of-grid-4">
            {this.renderOpportunity(
              null,
              "/services/something",
              "Modeling and promotions for clothing brands"
            )}
          </div>
        </div>

        <div className="of-grid-row">
          <div className="of-grid-gutter-4 of-grid-4" ref="opportunity_container">
            {this.renderOpportunity(
              null,
              "/services/something",
              "Modeling and promotions for clothing brands"
            )}
          </div>

          <div className="of-grid-gutter-1 of-grid-4">
            {this.renderOpportunity(
              null,
              "/services/something",
              "Modeling and promotions for clothing brands"
            )}
          </div>

          <div className="of-grid-gutter-1 of-grid-4">
            {this.renderOpportunity(
              null,
              "/services/something",
              "Modeling and promotions for clothing brands"
            )}
          </div>
        </div>

        <div className="of-grid-row">
          <div className="of-grid-gutter-4 of-grid-4" ref="opportunity_container">
            {this.renderOpportunity(
              null,
              "/services/something",
              "Modeling and promotions for clothing brands"
            )}
          </div>

          <div className="of-grid-gutter-1 of-grid-4">
            {this.renderOpportunity(
              null,
              "/services/something",
              "Modeling and promotions for clothing brands"
            )}
          </div>

          <div className="of-grid-gutter-1 of-grid-4">
            {this.renderOpportunity(
              null,
              "/services/something",
              "Modeling and promotions for clothing brands"
            )}
          </div>
        </div>
      </div>
    )
	}
}

function mapStateToProps({app}) {
	return {
		totalScrolledPixels: app.totalScrolledPixels,
    clientHeight: app.clientHeight,
    clientWidth: app.clientWidth
  };
}

export default connect(mapStateToProps, {})(SectionOpportunities);
