import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";
import { appReducer } from "./appReducer";
import { jamsReducer } from "./jamsReducer";
import { playerReducer } from "./playerReducer";
import { analyserReducer } from "./analyserReducer";

const REDUCERS_OBJECT = {
	app: appReducer,
	jams: jamsReducer,
	form: formReducer,
	analyser: analyserReducer,
	router: routerReducer,
	player: playerReducer
};

export default combineReducers(REDUCERS_OBJECT);
