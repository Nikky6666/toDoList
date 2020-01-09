import {createStore} from "redux";
import reduser from "./reduser";

const store = createStore(reduser);
window.store = store;
export default store;