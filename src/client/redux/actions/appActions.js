import * as _ from "lodash";
import axios from "axios";

import {
	SHOW_GRID,
	HIDE_GRID,
	UPDATE_TOTAL_PIXELS,
	UPDATE_TOTAL_SCROLLED_PIXELS,
	SCROLL_TO,
	SCROLL_TO_RESET
} from "../actions/types";

/////////////////////////////////////////////////

export const showGrid = () => dispatch => {
	dispatch({
		type: SHOW_GRID,
	});
};

export const hideGrid = () => dispatch => {
	dispatch({
		type: HIDE_GRID,
	});
};

/////////////////////////////////////////////////


export const updateTotalPixels = (total, clientWidth, clientHeight) => async (dispatch, getState) => {
	dispatch({
		type: UPDATE_TOTAL_PIXELS,
		total: total,
		clientWidth: clientWidth,
		clientHeight: clientHeight,
	});
}

export const updateTotalScrolledPixels = (px) => async (dispatch, getState) => {
	dispatch({
		type: UPDATE_TOTAL_SCROLLED_PIXELS,
		pixels: px
	});
}

/////////////////////////////////////////////////

export const setScrollTo = (px) => async (dispatch) => {
	dispatch({
		type: SCROLL_TO,
		payload: px
	});
}

export const resetScrollTo = (px) => async (dispatch) => {
	dispatch({
		type: SCROLL_TO_RESET
	});
}
