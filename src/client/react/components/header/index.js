import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import posed, { PoseGroup } from 'react-pose';

import Logo from '../svg/logo'
import MainLinks from '../navigation/main_links'

import {
	createJam
} from '../../../redux/actions/jamActions'

class Header extends Component {

	renderAuthButton() {
		return this.props.auth ? (
			<div className="user-info">

				<button onClick={() => this.props.createJam()}>
					Create new jam
				</button>

				<a href="/api/logout">
					Logout
				</a>
			</div>
		) : (
			<div className="user-info">
				<a href="/api/auth/google">
					Login with Google
				</a>
			</div>
		);
	}

	render() {
		return (
			<div className="app-header">

        <div className="header-left">
					<div className="app-logo">
						<Link to='/'><Logo/></Link>
					</div>
					<MainLinks isVisible={true} />
				</div>

				<div className="header-right">

					<div className="user-info-container">
						{this.renderAuthButton()}
					</div>
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

export default connect(mapStateToProps, {createJam})(Header);
