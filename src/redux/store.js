import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { addExerciseToCategory } from "./middleware/adminMiddleware"

export default createStore( 
  rootReducer,
  applyMiddleware(addExerciseToCategory)
);