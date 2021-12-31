import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { questionReducer } from "./reducers/question-reducer";

const appReducer = combineReducers({
    questionReducer: questionReducer,
});

export const store = createStore(appReducer, applyMiddleware(thunk));

export default store;