import {
  SEARCH_JAMS,
  SEARCH_JAMS_SUCCESS,
  CREATE_JAM,
	CREATE_JAM_SUCCESS,
  DELETE_JAM
} from "../actions/types";

export const initialState = {
  loading: false,
	currentlJam: {},
  loadedJamsCollection: [],
  updateCollection: false
};

export const jamsReducer = (state = initialState, action) => {
	switch (action.type) {
    case SEARCH_JAMS:
			return {
				...state,
				loading: true,
        updateCollection: false
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
        loading: true,
      }
		case CREATE_JAM_SUCCESS:
			return {
				...state,
				currentlJam: action.payload,
        loading: false,
        updateCollection: true
			}
    case DELETE_JAM:
      return {
        ...state,
        updateCollection: true
      }
		default:
			return state;
	}
};
