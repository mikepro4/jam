import * as _ from "lodash";
import axios from "axios";

import {
  SEARCH_VIZ,
  SEARCH_VIZ_SUCCESS,
  CREATE_VIZ,
	CREATE_VIZ_SUCCESS
} from "../actions/types";

// =============================================================================

export const createViz = (metadata) => async (dispatch, getState, api) => {

  dispatch({
		type: CREATE_VIZ
	});

	const res = await axios.post("/api/viz/create", {
    metadata: {
    }
  });

	dispatch({
		type: CREATE_VIZ_SUCCESS,
		payload: res.data
	})
}

// =============================================================================

export const searchViz = (
	criteria,
	sortProperty,
	offset = 0,
	limit = 0,
	success
) => async (dispatch, getState, api) => {

	dispatch({
		type: SEARCH_VIZ
	});

	const response = await axios.post("/api/viz/search", {
		criteria,
		sortProperty,
		offset,
		limit
	});

	dispatch({
		type: SEARCH_VIZ_SUCCESS,
		payload: response.data
	});

	if (response.data && success) {
		success();
	}
};

// =============================================================================

export const deleteViz = (vizId, success) => async (
	dispatch,
	getState,
	api
) => {
	const response = await axios.post("/api/viz/delete", { vizId });
	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const updateViz = (vizId, newViz, success) => async (
	dispatch,
	getState,
	api
) => {
	const response = await axios.post("/api/viz/update", {
		vizId,
		newViz
	});
	if (success) {
		success(response.data);
	}
};
