import {
  TRACK_LOAD,
  TRACK_PLAY,
  TRACK_PAUSE,
  TRACK_STOP,
  TRACK_SEEK,
  TRACK_PLAYING,
  SET_ANALYSER
} from "../actions/types";

export const initialState = {
  loading: false,
  jamId: "",
  status: "stop",
  currentTime: 0,
  seekToSeconds: null,
  trackMetadata: {},
  analyser: null
};

export const playerReducer = (state = initialState, action) => {
	switch (action.type) {
    case SET_ANALYSER: {
      return {
        ...state,
        analyser: action.payload
      }
    }
    case TRACK_LOAD:
			return {
				...state,
        trackMetadata: action.payload.metadata,
        jamId: action.payload._id,
        seekToSeconds: null
			}
    case TRACK_PLAY:
      return {
        ...state,
        status: "play",
        seekToSeconds: null,
        trackMetadata: action.payload.metadata,
        jamId: action.payload._id
      }
    case TRACK_PAUSE:
      return {
        ...state,
        status: "pause",
        seekToSeconds: null,
        trackMetadata: action.payload.metadata,
        jamId: action.payload._id
      }
    case TRACK_STOP:
      return {
        ...state,
        status: "stop",
        seekToSeconds: null,
        trackMetadata: action.payload.metadata,
        jamId: action.payload._id
      }
    case TRACK_SEEK:
      return {
        ...state,
        seekToSeconds: action.seekToSeconds,
        trackMetadata: action.payload.metadata,
        jamId: action.payload._id
      }
    case TRACK_PLAYING:
      return {
        ...state,
        seekToSeconds: null,
        currentTime: action.currentTime,
      }
		default:
			return state;
	}
};
