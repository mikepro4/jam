import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import SplitText from 'react-pose-text';
import classNames from "classnames"
import { Link } from "react-router-dom";
import posed from 'react-pose';

class Button extends Component {
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

  componentDidMount() {
  }

  isLink() {
    return this.props.linkUrl && this.props.linkUrl.length > 0
  }

  getButtonLabel() {
    if(this.props.label) {
      return <span className="of-button-text">{this.props.label}</span>
    } else {
      return
    }
  }

	render() {
    let buttonClasses = classNames({
      "of-button": !this.props.linkUrl,
      "of-link": this.isLink(),
      "of-button-white": this.props.buttonWhite,
      "of-button-black": this.props.buttonBlack,
      "of-button-outlined": this.props.buttonOutlined,
      "of-button-filled": !this.props.buttonOutlined
    })

    if(this.isLink()) {
      return (
        <Link to={this.props.linkUrl} className={buttonClasses} title={this.props.title}>
          {this.getButtonLabel()}
        </Link>
      )
    }

		return (
      <button className={buttonClasses} title={this.props.title}>
        {this.getButtonLabel()}
      </button>
    )
	}
}

function mapStateToProps({app}) {
	return {};
}

export default connect(mapStateToProps, {})(Button);
