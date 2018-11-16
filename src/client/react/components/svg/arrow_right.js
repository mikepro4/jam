import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class ArrowRight extends Component {
	render() {
		return (
			<div className="svg-wrapper">
        <svg width='6' height='10' viewBox='0 0 6 10' xmlns='http://www.w3.org/2000/svg'>
          <g id='Page-1' fill='none' fillRule='evenodd'>
              <g id='Artboard-Copy-51' transform='translate(-957 -6870)' fillRule='nonzero'
              stroke='#fff'>
                  <polyline id='Path-3' points='957.682485 6870.99096 961.682485 6875.43641 957.682485 6878.99096'
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

export default connect(mapStateToProps, {})(ArrowRight);
