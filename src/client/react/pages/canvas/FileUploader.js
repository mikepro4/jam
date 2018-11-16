import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import qs from "qs";
import * as _ from "lodash";
import classNames from "classnames";

import Dropzone from "react-dropzone";
import axios from "axios";

class FileUploader extends Component {
	state = {
		imageUrl: "",
		editedAvatar: false
	};

	handleDrop = files => {
    console.log(files)
    this.props.onComplete(
      files[0].preview
    )

    const formData = new FormData();
		formData.append("file", files[0]);

    axios.post(
      '/api/upload',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
      ).then(response => {
        if (response.status === 200 && response.data) {
            console.log(response);
        }
      })
      .catch(error => {
          console.log(error);
      });
	};

	render() {
		if (this.props.canUpload) {
			return (
				<Dropzone
					onDrop={this.handleDrop}
					className="avatar-container"
					className={classNames({
						"avatar-container": true,
						"empty-avatar": !this.state.editedAvatar && !this.props.imageUrl
					})}
				>
					{!this.state.editedAvatar && !this.props.imageUrl ? (
						<div className="empty-avatar-container">
							upload file
						</div>
					) : (
						<img
							src={
								this.state.editedAvatar
									? this.state.imageUrl
									: this.props.imageUrl
							}
						/>
					)}
				</Dropzone>
			);
		} else {
			return (
				<div className="avatar-container">
					{!this.state.editedAvatar && !this.props.imageUrl ? (
						"no image"
					) : (
						<div>{this.props.imageUrl}</div>
					)}
				</div>
			);
		}
	}
}

const mapStateToProps = state => ({
});

export default withRouter(connect(mapStateToProps, {})(FileUploader));
