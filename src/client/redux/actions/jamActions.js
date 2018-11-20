import * as _ from "lodash";
import axios from "axios";

import {
  SEARCH_JAMS,
  SEARCH_JAMS_SUCCESS,
  CREATE_JAM,
	CREATE_JAM_SUCCESS,
  DELETE_JAM
} from "../actions/types";

// =============================================================================

export const createJam = (metadata) => async (dispatch, getState, api) => {

  dispatch({
		type: CREATE_JAM
	});

	const res = await axios.post("/api/jams/create", {
    metadata: {
      albumCoverUrl: "",
      artistName: "DCDNT",
      artistNameFontSize: "",
      artistNameFontFamily: "",
      trackName: "1:1",
      trackNameFontSize: "",
      trackNameFontFamily: "",
      duration: 100,
      audioUrl: "https://res.cloudinary.com/dcdnt/video/upload/v1542303649/nclslkt93yar4df1b4cd.mp3",
      textColor: "white",
      controlsColor: "white",
      textPosition: "bottom_left",
    }
  });

	dispatch({
		type: CREATE_JAM_SUCCESS,
		payload: res.data
	})
}

// =============================================================================

export const searchJams = (
	criteria,
	sortProperty,
	offset = 0,
	limit = 0,
	success
) => async (dispatch, getState, api) => {

	dispatch({
		type: SEARCH_JAMS
	});

	const response = await axios.post("/api/jams/search", {
		criteria,
		sortProperty,
		offset,
		limit
	});

	dispatch({
		type: SEARCH_JAMS_SUCCESS,
		payload: response.data
	});

	if (response.data && success) {
		success();
	}
};

// =============================================================================

export const deleteJam = (jamId, success) => async (
	dispatch,
	getState,
	api
) => {

	const response = await axios.post("/api/jams/delete", { jamId });
  if(response) {
    dispatch({
      type: DELETE_JAM
    });
  }
	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const updateJam = (jamId, newJam, success) => async (
	dispatch,
	getState,
	api
) => {
	const response = await axios.post("/api/jams/update", {
		jamId,
		newJam
	});
	if (success) {
		success(response.data);
	}
};
