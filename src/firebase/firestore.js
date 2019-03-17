import { firestore } from "./firebase";

//TODO: REFACTOR TO ALLOW FOR INFINITE NESTED CATEGORIES
//CHECK FOR VARIABLE LAST: BOOL IN ALL COLLECTION DOCS

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
          thisDoc.categories.forEach(cat => {
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
                      exercisesFlat[exercise.id] = thisExercise;
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
  let ret = { exercises: exercises, exercisesFlat: exercisesFlat };
  return ret;
};

const getExercise = (categoryReference, admin) => {
  let result = {};
  return new Promise(resolve => {
    firestore
    .collection(`${categoryReference}/Exercises`)
    .get()
    .then(exercises => {
      exercises.forEach(exercise => {
        let thisExercise = exercise.data();
        if (thisExercise.active || admin) {
          result = { ...result, [exercise.id]: thisExercise };
        }
      });
      resolve(result)
    })
    .catch(err => console.log(err));
  })
};

const getSubCategory = (categoryReference, admin) => {
  let currentCollection = `${categoryReference}/SubCategories`;
  let result = {};
  let resultFlat = {};
  return new Promise(resolve => {
    firestore
    .collection(currentCollection)
    .get()
    .then(categories => {
      categories.forEach(async category => {
        let thisCategory = category.data();
        currentCollection = `${currentCollection}/${category.id}`;
        if (thisCategory.active || admin) {
          result = { ...result, [category.id]: thisCategory };
          if (thisCategory.last) {
            await getExercise(currentCollection, admin).then(ret => {
              result[category.id] = { ...result[category.id], ...ret };
              resultFlat = { ...resultFlat, ...ret };
            });
          } else {
           await getSubCategory(currentCollection, admin).then(ret => {
              result[category.id] = {
                ...result[category.id],
                ...ret.result
              };
              resultFlat = { ...resultFlat, ...ret.resultFlat };
            });
          }
        }
      });
      resolve({result, resultFlat})
    })
    .catch(err => console.log(err));
  })
};

export const getExercisesNew = async admin => {
  let currentCollection = "Gym/Imperia/Exercises";
  let ret = await firestore
    .collection(currentCollection)
    .get()
    .then(colRef => {
      let exercises = {};
      let exercisesFlat = {};
      colRef.forEach(async category => {
        let thisCategory = category.data();
        if (thisCategory.active || admin) {
          exercises = { ...exercises, [category.id]: thisCategory };
          let thisCollection = `${currentCollection}/${category.id}`;
          if (thisCategory.last) {
            await getExercise(thisCollection, admin).then(ret => {
              exercises[category.id] = {
                ...exercises[category.id],
                ...ret
              };
              exercisesFlat = { ...exercisesFlat, ...ret };
              console.log(
                "exercisesFlat after getExercise in getExercisesNew: ",
                exercisesFlat
              );
            });
          } else {
            await getSubCategory(thisCollection, admin).then(ret => {
              console.log("Return from getSubCategory: ", ret);
              exercises[category.id] = {
                ...exercises[category.id],
                ...ret.result
              };
              exercisesFlat = { ...exercisesFlat, ...ret.resultFlat };
              console.log(
                "exercisesFlat after getSubCategory in getExercisesNew: ",
                exercisesFlat
              );
            });
          }
        }
      });
      return {exercises, exercisesFlat}
    })
    .catch(err => console.log(err));

  console.log("Returned exercises: ", ret);
  return ret;
};
