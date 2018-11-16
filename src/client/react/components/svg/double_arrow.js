import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class DoubleArrow extends Component {
	render() {
		return (
			<div className="svg-wrapper">
        <svg width='10' height='63' viewBox='0 0 10 63' xmlns='http://www.w3.org/2000/svg'>
          <g id='Page-1' fill='none' fillRule='evenodd'>
              <g id='Artboard-Copy-39' transform='translate(-48 -836)' fill='#FFF' fillRule='nonzero'>
                  <polygon id='Combined-Shape' points='52.5454545 837.840765 48 842.386219 48 840.990539 52.9905385 836 58 841.009461 58 842.405142 53.4545455 837.859688 53.4545455 896.693272 58 892.147818 58 893.543498 53.0094615 898.534037 48 893.524575 48 892.128895 52.5454545 896.674349'
                  />
              </g>
          </g>
        </svg>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
	};
}

export default connect(mapStateToProps, {})(DoubleArrow);
