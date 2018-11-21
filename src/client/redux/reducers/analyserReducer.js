import {
  SET_ANALYSER
} from "../actions/types";

export const initialState = {
  instance: null
};

export const analyserReducer = (state = initialState, action) => {
	switch (action.type) {
    case SET_ANALYSER: {
      return {
        ...state,
        instance: action.payload
      }
    }
		default:
			return state;
	}
};
