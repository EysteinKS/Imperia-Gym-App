
//EXERCISE
export const ADD_EXERCISE = "ADD_EXERCISE"
export const addExercise = (payload) => ({
  type: ADD_EXERCISE,
  payload
})

export const EDIT_EXERCISE = "EDIT_EXERCISE"
export const editExercise = (payload) => ({
  type: EDIT_EXERCISE,
  payload
})

export const UPDATE_EXERCISE = "UPDATE_EXERCISE"
export const updateExercise = (payload) => ({
  type: UPDATE_EXERCISE,
  payload
})

export const DELETE_EXERCISE = "DELETE_EXERCISE"
export const deleteExercise = (payload) => ({
  type: DELETE_EXERCISE,
  payload
})
//EXERCISE END

//CATEGORY
export const ADD_CATEGORY = "ADD_CATEGORY"
export const addCategory = (payload) => ({
  type: ADD_CATEGORY,
  payload
})

export const EDIT_CATEGORY = "EDIT_CATEGORY"
export const editCategory = (payload) => ({
  type: EDIT_CATEGORY,
  payload
})

export const UPDATE_CATEGORY = "UPDATE_CATEGORY"
export const updateCategory = (payload) => ({
  type: UPDATE_CATEGORY,
  payload
})

export const DELETE_CATEGORY = "DELETE_CATEGORY"
export const deleteCategory = (payload) => ({
  type: DELETE_CATEGORY,
  payload
})
//CATEGORY END

//DIALOG WINDOW
export const SET_DIALOG_TYPE = "SET_DIALOG_TYPE"
export const setDialogType = (payload) => ({
  type: SET_DIALOG_TYPE,
  payload
})

export const OPEN_DIALOG = "OPEN_DIALOG"
export const openDialog = (payload) => ({
  type: OPEN_DIALOG,
  payload
})

export const EXIT_DIALOG = "EXIT_DIALOG"
export const exitDialog = (payload) => ({
  type: EXIT_DIALOG,
  payload
})
//DIALOG WINDOW END

//SAVING TO FIRESTORE
export const SAVE_EXERCISES = "SAVE_EXERCISES"
export const saveExercises = (payload) => ({
  type: SAVE_EXERCISES,
  payload
})

export const SAVE_EXERCISES_SUCCESS = "SAVE_EXERCISES_SUCCESS"
export const saveExercisesSuccess = (payload) => ({
  type: SAVE_EXERCISES_SUCCESS,
  payload
})

export const SAVE_EXERCISES_FAILED = "SAVE_EXERCISESE_FAILED"
export const saveExercisesFailed = (payload) => ({
  type: SAVE_EXERCISES_FAILED,
  payload
})
//SAVING TO FIRESTORE END