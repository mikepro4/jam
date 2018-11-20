import * as _ from "lodash";
import axios from "axios";

import {
  TRACK_LOAD,
  TRACK_PLAY,
  TRACK_PAUSE,
  TRACK_STOP,
  TRACK_SEEK,
  TRACK_PLAYING,
  SET_ANALYSER
} from "../actions/types";

// =============================================================================

export const trackLoad = (jam) => async (dispatch, getState, api) => {
  dispatch({
    type: TRACK_LOAD,
    payload: jam
  });
}

export const trackPlay = (jam) => async (dispatch, getState, api) => {
  dispatch({
    type: TRACK_PLAY,
    payload: jam
  });
}

export const trackPause = (jam) => async (dispatch, getState, api) => {
  dispatch({
    type: TRACK_PAUSE,
    payload: jam
  });
}

export const trackStop = (jam) => async (dispatch, getState, api) => {
  dispatch({
    type: TRACK_STOP,
    payload: jam
  });
}

export const trackSeek = (seconds, jam) => async (dispatch, getState, api) => {
  dispatch({
    type: TRACK_SEEK,
    seekToSeconds: seconds,
    payload: jam
  });
}

export const trackPlaying = (id, currentTime, metadata) => async (dispatch, getState, api) => {
  dispatch({
    type: TRACK_PLAYING,
    id: id,
    currentTime: currentTime,
    metadata: metadata
  });
}

export const setAnalyser = (analyser) => async (dispatch, getState, api) => {
  dispatch({
    type: SET_ANALYSER,
    payload: analyser
  });
}
