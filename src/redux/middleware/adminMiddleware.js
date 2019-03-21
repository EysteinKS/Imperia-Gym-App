import { firestore as f } from "../../firebase"
import * as admin from "../actions/adminActions"
import _ from "lodash"

//DISPATCHES UPDATE_CATEGORY ON ADD_EXERCISE
export const addExerciseToCategory = store => next => action => {
  if(action.type === "ADD_EXERCISE"){
    const { location, id, active } = action.payload
    const newLocation = f.makeExercisesRef(f.makeCategoriesRef(location)) + `.${id}`
    let updatePayload = _.update(action.payload, newLocation, active)
    store.dispatch(admin.updateCategory(updatePayload))
    next(action)
  }
}