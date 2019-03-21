import { firestore } from "./firebase";
import { mapObject } from "../util";
import _ from "lodash/fp/object"

//MAIN API
export const getFirestoreDoc = async refString => {
  let thisDoc = await firestore
    .doc(refString)
    .get()
    .then(async docRef => {
      return await docRef.data();
    })
    .catch(error =>
      console.log(`Error while importing from ${refString}:`, error)
    );
  await console.log("Got ", refString);
  return thisDoc;
};

export const getFirestoreCollection = async (refString, where) => {
  let thisCol = await firestore
    .collection(refString)
    .where(where)
    .get()
    .then(async colRef => {
      let ret = {};
      await colRef.forEach(docRef => {
        ret[docRef.id] = docRef.data();
      });
      return ret;
    })
    .catch(err => console.log(`Error while importing ${refString}:`, err));
  return thisCol;
};

export const addDocumentWithRandomID = (refString, getData) => {
  let documentRef = "";

  firestore
    .collection(refString)
    .add(getData)
    .then(docRef => {
      documentRef = docRef.id;
      return documentRef;
    })
    .catch(error => console.log("Error adding document with Random ID", error));
};

export const setDataToFirestore = async (refString, setVariable) => {
  firestore
    .doc(refString)
    .set(setVariable)
    .then(ret => {
      console.log(`${setVariable} set to ${refString}`);
      return ret;
    })
    .catch(error => console.log("Error setting data in Firestore", error));
};

export const mergeDataToFirestore = (refString, updateVariable) => {
  firestore
    .doc(refString)
    .set(updateVariable, {merge: true})
    .then(() => {
      console.log(`${updateVariable} updated to ${refString}`);
    })
    .catch(error => console.log("Error updating data in Firestore", error));
};

export const updateDataToFirestore = ( refString, updateVariable ) => {
  firestore
    .doc(refString)
    .update(updateVariable)
    .then(() => {
      console.log(`${updateVariable} updated to ${refString}`);
    })
    .catch(error => console.log("Error updating data in Firestore", error));
}

export const deleteFirestoreData = refString => {
  firestore.doc(refString).delete();
};
//MAIN API END

//REFERENCE STRING CONSTRUCTORS
export const makeFirestoreRef = arr => {
  let reference = arr.join("/");
  console.log("makeFirestoreRef: ", reference)
  return reference;
};

export const makeCategoriesRef = arr => {
  let reference = arr.join(".categories.");
  console.log("makeCategoriesRef: ", reference)
  return reference;
};

export const makeExercisesRef = str => {
  let reference = str + ".exercises"
  console.log("makeExercisesRef: ", reference)
  return reference
};
//CONSTRUCTORS END


//EXERCISES API
export const getExercisesFromFirestore = async () => {
  let exerciseCategories = await getFirestoreDoc(makeFirestoreRef([
    "Gym",
    "imperia",
    "exercises",
    "categories"
  ]));
  let exerciseList = await getFirestoreDoc(makeFirestoreRef([
    "Gym",
    "imperia",
    "exercises",
    "exercisesList"
  ]));
  await console.log("Exercises from Firestore: ", {exerciseCategories, exerciseList})
  return { exerciseCategories, exerciseList };
};

export const initializeExercisesToFirestore = async ({
  categories,
  exercisesList
}) => {
  await setDataToFirestore(
    ["Gym", "imperia", "exercises", "exercisesList"],
    exercisesList
  );
  await setDataToFirestore(
    ["Gym", "imperia", "exercises", "categories"],
    categories
  );
  await console.log("Exercises initialized in Firestore!");
};

export const addExerciseToFirestore = async (obj, doc) => {
  let newDocRef = makeFirestoreRef(["Gym", "imperia", "exercises"].concat(doc))
  await mergeDataToFirestore(
    newDocRef,
    obj
  );
};

export const updateExerciseInFirestore = async (obj, doc) => {
  let newDocRef = makeFirestoreRef(["Gym", "imperia", "exercises"].concat(doc))
  await updateDataToFirestore(
    newDocRef,
    obj
  )
}

//EXERCISES API END

//EXERCISES SCHEMAS

const initialExercise = {
  id: null,
  name: {"NO": "", "EN": ""},
  weightArray: false,
  active: false,
  location: ""
}

export const exerciseFactory = (obj = initialExercise) => {
  let ret = {}
  if(obj !== initialExercise){
    let newObj = _.cloneDeep(obj)
    ret = _.merge({...initialExercise}, newObj)
  } else { ret = obj }
  return { ...ret};
};

export const categoryFactory = obj => {
  let languages = {};
  mapObject(obj.name, lang => {
    languages[lang] = obj.name[lang];
  });
  let nested = {};
  if (obj.categories) {
    nested = { ...nested, categories: obj.categories };
  }
  if (obj.exercises) {
    nested = { ...nested, exercises: obj.exercises };
  }
  return {
    id: obj.id,
    active: obj.active,
    name: languages,
    ...nested,
    location: obj.location,
    ...obj
  };
};
/*
EXAMPLE SCHEMA INPUT

console.log(
  exerciseFactory({
    id: "SF01",
    name: { NO: "Sit ups", EN: "Sit ups" },
    weight: [1, 2, 3, 4, 5],
    active: true,
    location: ["FreeWeight", "SecondFloor"]
  })
);
console.log(
  categoryFactory({
    id: "FirstFloor",
    name: { NO: "Første Etasje", EN: "First Floor" },
    exercises: { FF01: true },
    location: ["FreeWeight"],
    active: true
  })
);

*/
//SCHEMAS END

export const addCategoryToFirestore = () => {};


//EXAMPLE SAVING
/*

let newExercise = {
  id: "FF01",
  name: {
    NO: "Benkpress",
    EN: "Bench pressure"
  },
  active: true,
  location: ["FreeWeight", "FirstFloor"]
};


let generatedExercise = exerciseFactory(newExercise)

addExerciseToFirestore({[generatedExercise.id]: generatedExercise}, "exercisesList");

let exerciseCategory = `${makeExercisesRef(makeCategoriesRef(newExercise.location))}.${generatedExercise.id}`

updateExerciseInFirestore(
  {
    [exerciseCategory]: false
  },
  "categories"
);
*/
//EXAMPLE END

//OLD GETEXERCISES FUNCTION
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