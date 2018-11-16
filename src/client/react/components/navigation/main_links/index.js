import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import posed, { PoseGroup } from 'react-pose';

const Parent = posed.ul({
	open: {
		opacity: 1,
		delayChildren: 500,
	  staggerChildren: 70,
		transition: {
			duration: 2200
		}
	},
  closed: { opacity: 0 },
	initialPose: 'closed'
});

const Child = posed.div({
	open: { y: 0, opacity: 1, transition: {duration: 300}  },
  closed: { y: 50, opacity: 0},
	initialPose: 'closed'
});


class MainLinks extends Component {
	isActivePath = (pathname) => {
		return this.props.location.pathname.indexOf(pathname) !== -1
	}
	render() {

    let links = [
      {
        url: "/about",
        name: "About"
      },
      {
        url: "/portfolio",
        name: "Portfolio"
      },
      {
        url: "/services",
        name: "Services"
      },
      {
        url: "/contact",
        name: "Contact"
      },
      {
        url: "/faq",
        name: "FAQ"
      }
    ]

		const {isVisible} = this.props

		return (
			<div className="main-links-container">
        <Parent
					className={classNames({"active": !(this.props.location.pathname == "/")}, "main-links")}
					initialPose="closed"
					pose={isVisible ? 'open' : 'closed'}
				>

          {links.map(link => {
            return (
              <li key={link.url} className={classNames("main-link-container", {
                  "main-link-active": this.isActivePath(link.url)
                })}
              >
								<Child>
	                <Link to ={link.url} className="main-link">
	                  <span className="main-link-label">{link.name}</span>
	                </Link>
								</Child>
              </li>
            )
          })}
        </Parent>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		location: state.router.location
	};
}

export default connect(mapStateToProps, {})(MainLinks);
