import {
  SEARCH_JAMS,
  SEARCH_JAMS_SUCCESS,
  CREATE_JAM,
	CREATE_JAM_SUCCESS
} from "../actions/types";

export const initialState = {
  loading: false,
	currentlJam: {},
  loadedJamsCollection: []
};

export const jamsReducer = (state = initialState, action) => {
	switch (action.type) {
    case SEARCH_JAMS:
			return {
				...state,
				loading: true
			}
    case SEARCH_JAMS_SUCCESS:
      return {
        ...state,
        loading: false,
        loadedJamsCollection: action.payload.all
      }
    case CREATE_JAM:
      return {
        ...state,
        loading: true
      }
		case CREATE_JAM_SUCCESS:
			return {
				...state,
				currentlJam: action.payload,
        loading: false
			}
		default:
			return state;
	}
};
