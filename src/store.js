import {applyMiddleware, createStore} from "redux";
import reduser from "./reduser";
import thunkMiddleware from 'redux-thunk'

const store = createStore(reduser, applyMiddleware(thunkMiddleware));
window.store = store;
export default store;