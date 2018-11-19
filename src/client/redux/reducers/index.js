import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";
import { appReducer } from "./appReducer";
import { jamsReducer } from "./jamsReducer";

const REDUCERS_OBJECT = {
	app: appReducer,
	jams: jamsReducer,
	form: formReducer,
	router: routerReducer
};

export default combineReducers(REDUCERS_OBJECT);
