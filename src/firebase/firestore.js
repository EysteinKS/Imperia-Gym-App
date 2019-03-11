import { firestore } from "./firebase";

export const getExercises = admin => {
  let exercises = {};
  let finished = false;
  firestore
    .collection("Exercises")
    .get()
    .then(colRef => {
      colRef.forEach(docRef => {
        //Gets each main category of exercises
        finished = false;
        let thisDoc = docRef.data();
        if (thisDoc.active || admin) {
          //If category is active or request is admin, store key in exercises and map through category
          let { ["categories"]: omit, ...docWithoutCategories } = thisDoc;
          exercises[docRef.id] = docWithoutCategories;
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
                    console.log(exercises);
                    if (thisExercise.active || admin) {
                      exercises[docRef.id][catID][exercise.id] = thisExercise;
                    }
                    if (!finished) {
                      finished = true;
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
  if (finished) {
    console.log(exercises);
    return exercises;
  }
};