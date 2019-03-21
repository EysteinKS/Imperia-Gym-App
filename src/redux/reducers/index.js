import { combineReducers } from "redux";
import admin from "./adminReducers"
import session from "./sessionReducers"

export default combineReducers({ admin, session })