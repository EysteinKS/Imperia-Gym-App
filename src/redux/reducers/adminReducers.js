import * as ADMIN from "../actions/adminActions";
import { firestore } from "../../firebase"
import _ from "lodash/fp/object"

const initialState = {
  newExercise: {},
  newCategory: {},
  saveQueue: [],
  confirmDelete: false,
  dialogType: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    //EXERCISE
    case ADMIN.ADD_EXERCISE:
      let newExercise = firestore.exerciseFactory(payload)
      return { ...state, ...newExercise }

    case ADMIN.EDIT_EXERCISE:
      const { location, id, active } = payload
      return { ...state, ...payload }

    case ADMIN.UPDATE_EXERCISE:
      return { ...state, ...payload }

    case ADMIN.DELETE_EXERCISE:
      return { ...state, ...payload }
    
    //CATEGORY
    case ADMIN.ADD_CATEGORY:
      return { ...state, ...payload }

    case ADMIN.EDIT_CATEGORY:
      return { ...state, ...payload }

    case ADMIN.UPDATE_CATEGORY:
      return { ...state, ...payload }

    case ADMIN.DELETE_CATEGORY:
      return { ...state, ...payload }

    //DIALOG
    case ADMIN.SET_DIALOG_TYPE:
      return { ...state, ...payload }

    case ADMIN.OPEN_DIALOG:
      return { ...state, ...payload }

    case ADMIN.EXIT_DIALOG: 
      return { ...state, ...payload }


    //SAVE
    case ADMIN.SAVE_EXERCISES:
      return { ...state, ...payload }

    case ADMIN.SAVE_EXERCISES_SUCCESS:
      return { ...state, ...payload }
    
    case ADMIN.SAVE_EXERCISES_FAILED:
      return { ...state, ...payload }

    default:
      return state
  }
}

