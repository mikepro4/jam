import {
	UPDATE_TOTAL_PIXELS,
	UPDATE_TOTAL_SCROLLED_PIXELS,
	SCROLL_TO,
	SCROLL_TO_RESET,
	SHOW_GRID,
	HIDE_GRID,
	FETCH_AUTH
} from "../actions/types";

export const initialState = {
	totalPixels: 0,
	clientWidth: 0,
	clientHeight: 0,
	totalScrolledPixels: 0,
	scrollTo: null,
	gridVisible: false,
	user: null
};

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_AUTH:
			return {
				...state,
				user: action.payload
			}
		case SHOW_GRID:
			return {
				...state,
				gridVisible: true
			}
		case HIDE_GRID:
			return {
				...state,
				gridVisible: false
			}
		case UPDATE_TOTAL_PIXELS:
			return  {
				...state,
				totalPixels: action.total,
				clientWidth: action.clientWidth,
				clientHeight: action.clientHeight
			}
		case UPDATE_TOTAL_SCROLLED_PIXELS:
			return {
				...state,
				totalScrolledPixels: action.pixels
			}
		case SCROLL_TO:
			return  {
				...state,
				scrollTo: action.payload
			}
		case SCROLL_TO_RESET:
			return {
				...state,
				scrollTo: null
			}
		default:
			return state;
	}
};
