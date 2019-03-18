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
  let ret = { exercises, exercisesFlat };
  return ret;
};

const getExerciseDocs = (categoryReference, admin) => {
  return new Promise(async resolve => {
    console.log("Getting: " + categoryReference);
    await firestore
      .collection(`${categoryReference}/Exercises`)
      .get()
      .then(async exercises => {
        let result = {};
        await exercises.forEach(exercise => {
          let thisExercise = exercise.data();
          if (thisExercise.active || admin) {
            result = { ...result, [exercise.id]: thisExercise };
          }
        });
        console.log("getExercisesDocs: ", result);
        resolve(result);
      })
      .catch(err => console.log(err));
  });
};

const getSubCategory = (categoryReference, admin) => {
  return new Promise(async resolve => {
    let currentCollection = `${categoryReference}/SubCategories`;
    console.log("Getting " + currentCollection);
    await firestore
      .collection(currentCollection)
      .get()
      .then(async categories => {
        let result = {};
        let resultFlat = {};
        await Promise.all(
          categories.forEach(async category => {
            let thisCategory = category.data();
            currentCollection = `${currentCollection}/${category.id}`;
            if (thisCategory.active || admin) {
              result = { ...result, [category.id]: thisCategory };
              if (thisCategory.last) {
                return await getExerciseDocs(currentCollection, admin);
              } else {
                return await getSubCategory(currentCollection, admin);
              }
            }
          })
        ).then(ret => {
          // eslint-disable-next-line
          ret.map(arr => {
            arr.forEach((key, index) => {
              if (arr.last === undefined) {
                resultFlat[arr.ID] = { ...resultFlat, ...arr };
                result["exercises"][key] = { ...result[key], ...arr };
              } else {
                result["categories"][key] = { ...result[key], ...arr };
              }
            });
          });
          resolve({ result, resultFlat });
        });
      })
      .catch(err => console.log(err));
  });
};

export const getExercisesNew = async admin => {
  let currentCollection = "Gym/Imperia/Exercises";
  let exercises = {};
  let exercisesFlat = {};
  await firestore
    .collection(currentCollection)
    .get()
    .then(async colRef => {
      await Promise.all(
        colRef.forEach(async category => {
          let thisCategory = category.data();
          if (thisCategory.active || admin) {
            exercises = { ...exercises, [category.id]: thisCategory };
            let thisCollection = `${currentCollection}/${category.id}`;
            if (thisCategory.last) {
              return await getExerciseDocs(thisCollection, admin);
            } else {
              return await getSubCategory(thisCollection, admin);
            }
          }
        })
      )
      .then(ret => {
        // eslint-disable-next-line
        ret.map(arr => {
          arr.forEach(key => {
            if (arr.last === undefined) {
              exercisesFlat[arr.ID] = { ...exercisesFlat, ...arr };
              exercises["exercises"][key] = { ...exercises[key], ...arr };
            } else {
              exercises["categories"][key] = { ...exercises[key], ...arr };
            }
          });
        });
      })
      .catch(err => console.log(err));
    });
    return { exercises, exercisesFlat };
};

/*
DATABASE STRUCTURE

Exercises (collection)
--FreeWeight (document { last: false })
  --SubCategories (collection)
    --FirstFloor (document { last: true })
      --Exercises (collection)
        --FF01 (document { ID: FFO1 etc... })
--Machines (document { last: false })
  --SubCategories (collection)
    --Legs (document { last: true })
      --Exercises (collection)
        --L01 (document { ID: L01 etc... })

result: {
  FreeWeight: {
    last: false
    name etc..
    SubCategories: {
      FirstFloor: {
        last: true
        name etc...
        Exercises: {
          FF01: {}
          FF02: {}
        }
      }
    }
  },
  Machines: {

  }
}
*/