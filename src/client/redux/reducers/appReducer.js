import { assign } from "lodash";
import update from "immutability-helper";

import {
	SHOW_APP,
	SHOW_GRID,
	HIDE_GRID,
	LOAD_USER_DETAILS_SUCCESS,
	LOAD_IMAGE_SUCCESS,
	UPDATE_TOTAL_PIXELS,
	UPDATE_TOTAL_SCROLLED_PIXELS,
	SCROLL_TO,
	SCROLL_TO_RESET
} from "../actions/types";

export const initialState = {
	totalPixels: 0,
	clientWidth: 0,
	clientHeight: 0,
	totalScrolledPixels: 0,
	introLength: 7000,
	appVisible: true,
	gridVisible: false,
	allImagesLoaded: false,
	loadedImages: {},
	userDetails: {
		id: null,
		externalUrl: null,
		posts: 0,
		followers: 0,
		following: 0,
		avatarUrl: null
	},
	scrollTo: null
};

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_APP:
			return assign({}, state, {
				appVisible: true
			});
		case SHOW_GRID:
			return assign({}, state, {
				gridVisible: true
			});
		case HIDE_GRID:
			return assign({}, state, {
				gridVisible: false
			});
		case LOAD_USER_DETAILS_SUCCESS:
			return assign({}, state, {
				userDetails: action.payload
			})

		case UPDATE_TOTAL_PIXELS:
			return assign({}, state, {
				totalPixels: action.total,
				clientWidth: action.clientWidth,
				clientHeight: action.clientHeight
			});
		case UPDATE_TOTAL_SCROLLED_PIXELS:
			return assign({}, state, {
				totalScrolledPixels: action.pixels
			});
		case LOAD_IMAGE_SUCCESS:
			let newLoadedImages = assign({}, state.loadedImages, {
				[action.imageId]: {
					i: action.i,
					imageDetails: action.payload
				}
			});
			return assign({}, state, {
				loadedImages: newLoadedImages
			});

		case SCROLL_TO:
			return assign({}, state, {
				scrollTo: action.payload
			});
		case SCROLL_TO_RESET:
			return assign({}, state, {
				scrollTo: null
			});
		default:
			return state;
	}
};
