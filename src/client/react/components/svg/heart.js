import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class Heart extends Component {
  getColor = () => {
    if(this.props.color == "white") {
      return "#FFF"
    } else if(this.props.color == "black") {
      return "#000"
    }
  }
	render() {
		return (
			<div className="svg-wrapper">
      <svg width='15' height='13' viewBox='0 0 15 13' xmlns='http://www.w3.org/2000/svg'>
          <g id='Page-1' fill='none' fillRule='evenodd' opacity='0.9'>
              <g id='Artboard-Copy-51' transform='translate(-1404 -6415)' fill={this.getColor()}
              fillRule='nonzero'>
                  <g id='Group-4' transform='translate(1165 6400)'>
                      <g id='Group-3-Copy-5' transform='translate(239 14)'>
                          <path d='M13.9195841,2.76368968 C12.3178951,1.06310379 9.56547793,1.51757071 7.87048657,3.08621459 C7.85493619,3.10087481 7.85493619,3.10087481 7.83938581,3.08621459 C6.15994484,1.51757071 3.39197731,1.06310379 1.79028824,2.76368968 C0.313002198,4.33233355 0.701761683,6.59000792 2.08574545,8.24661314 C3.88958945,10.4163262 7.59057974,13.4363321 7.83938581,13.6708957 C7.85493619,13.6855559 7.85493619,13.6855559 7.87048657,13.6708957 C8.11929264,13.4363321 11.7891822,10.533608 13.6241269,8.24661314 C14.9770099,6.56068748 15.3968702,4.33233355 13.9195841,2.76368968 Z'
                          id='Shape' />
                      </g>
                  </g>
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

export default connect(mapStateToProps, {})(Heart);
