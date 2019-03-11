import { firestore } from "./firebase";

export const getExercises = async admin => {
  let exercises = {};
  let exercisesFlat = {};
  await firestore
    .collection("Exercises")
    .get()
    .then(colRef => {
      colRef.forEach(docRef => {
        //Gets each main category of exercises
        let thisDoc = docRef.data();
        if (thisDoc.active || admin) {
          //If category is active or request is admin, store key in exercises and map through category
          // eslint-disable-next-line
          let { ["categories"]: omit, ...docWithoutCategories } = thisDoc;
          exercises[docRef.id] = docWithoutCategories;
          // eslint-disable-next-line
          thisDoc.categories.map(cat => {
            let catID = cat.id;
            exercises[docRef.id][catID] = cat;
            if (cat.active || admin) {
              console.log(`Getting Exercises/${docRef.id}/${catID}`);
              firestore
                .collection(`Exercises/${docRef.id}/${catID}`)
                .get()
                .then(catRef => {
                  catRef.forEach(exercise => {
                    let thisExercise = exercise.data();
                    if (thisExercise.active || admin) {
                      exercises[docRef.id][catID][exercise.id] = thisExercise;
                      exercisesFlat[exercise.id] = thisExercise
                    }
                  });
                })
                .catch(err => console.log("Error: ", err));
            }
          });
        }
      });
    })
    .catch(err => console.log("Error: ", err));
    let ret = { exercises: exercises, exercisesFlat: exercisesFlat }
    return ret;
};

/* REFACTORING GETEXERCISES
const getExercise = () => {
  return new Promise(resolve => {
    resolve(null);
  });
};

const getSubCategories = () => {
  return new Promise(resolve => {
    resolve(null);
  });
};

const getMainCategories = () => {
  return new Promise(resolve => {
    resolve(null);
  });
};

export const getData = async admin => {
  let data = {}
  await firestore.collection("Exercises").get().then(colRef => {

  })
}
*/