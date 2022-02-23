import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { userLoginReducer } from "./reducers/userReducers";

const reducer = combineReducers({
    // this will contain our reducers
    userLogin: userLoginReducer,
})

/* This is creating an initial state object. */
const initialState = {}

/* Adding the thunk middleware to the store. */
const middleware = [thunk]

/* Creating a store object that will contain the reducer and the initial state. */
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;