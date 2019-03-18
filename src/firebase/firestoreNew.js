import { firestore } from "./firebase";

export const getAllExercises = async admin => {
    let currentCollection = "Gym/Imperia/Exercises";
    let returns = {}
    //GETS COLLECTION CONTAINING MAIN CATEGORIES ´
    await getCollectionFromFirestore(currentCollection, colRef => {
        //WAIT FOR ALL CATEGORIES TO RESOLVE
        Promise.all(
            colRef.forEach(category => {
                let thisCat = category.data()
                if(thisCat.active || admin){
                    returns = { thisCat, ...returns}
                    let thisCollection = `${currentCollection}/${category.id}`;
                    if(thisCat.last !== undefined){
                        thisCollection = getNextCollectionString(thisCollection, thisCat.last ? "exercise" : "sub")
                        return getSubCategoryFromCategory(thisCollection, admin)
                    } else {
                        return getExercisesFromCategory(thisCollection, admin)
                    }
                }
            })
        ).then(ret => console.log(ret))
    })
};


const getExercisesFromCategory = (categoryReference, admin) => {
  return new Promise(resolve => {
    console.log("Getting: " + categoryReference);
    getCollectionFromFirestore(categoryReference, exercises => {
      let result = {};
      exercises.forEach(exercise => {
        let thisExercise = exercise.data();
        if (thisExercise.active || admin) {
          result = { ...result, [exercise.id]: thisExercise };
        }
      });
      console.log("getExercisesDocs: ", result);
      resolve(result);
    });
  });
};

const getSubCategoryFromCategory = (categoryReference, admin) => {
  return new Promise(resolve => {
    console.log("Getting: " + categoryReference);
    getCollectionFromFirestore(categoryReference, categories => {
      let result = {};
      categories.forEach(category => {
        let thisCategory = category.data();
        let currentCollection = `${categoryReference}/${category.id}`;
        if (thisCategory.active || admin){
            result = {...result, [category.id]: thisCategory}
            if (thisCategory.last) {
                currentCollection = getNextCollectionString(currentCollection, "exercise")

            } else {
                currentCollection = getNextCollectionString(currentCollection, "sub")

            }
        }
      });
    });
  });
};

const getCollectionFromFirestore = async (col, cb) => {
  await firestore
    .collection(col)
    .get.then(cb)
    .catch(err => console.log(err));
};

const mapPromises = async (input, cb) => {
    Promise.all(input).then(cb)
}

const getNextCollectionString = (col, colType) => {
  switch (colType) {
    case "main":
      return col;
    case "sub":
      return `${col}/SubCategories`;
    case "exercise":
      return `${col}/Exercises`;
    default:
      break;
  }
};

const databaseExample = {

    exercises: {
        FreeWeight: {

        },
        Machines: {

        }
    }
}


export const main = async () => {
  let object = {}
  let promises = []
  let colString = "Gym/Imperia/Exercises"
  firestore.collection(colString).get().then(colRef => {
    colRef.forEach(category => {
      let thisCat = category.data()
      colString = `${colString}/${category.id}`
      object[category.id] = thisCat
      if(thisCat.last === undefined){
        colString = `${colString}/Exercises`
        promises.push(ex(colString))
      } else {
        colString = `${colString}/SubCategories`
        promises.push(cat(colString))
      }
    })
  })

  Promise.all(promises)
  .then(res => {
    res.map((key, index) => {
      object[key] = { ...object[key], ...res[index]}
    })
    console.log("main: ", object)
    return object
  })
}

const ex = (colString) => {
  return new Promise(resolve => {
    firestore.collection(colString).get().then(async exRef => {
      let obj = {}
      await exRef.forEach(ex => {
        let thisEx = ex.data()
        obj[ex.id] = thisEx
      })
      resolve(obj)
    })
  })
}

const cat = (colString) => {
  return new Promise(resolve => {
    let object = {}
    let promises = []
    firestore.collection(colString).get().then(catRef => {
      catRef.forEach(category => {
        let thisCat = category.data()
        colString = `${colString}/${category.id}`
        object[category.id] = thisCat
        if(thisCat.last === undefined){
          colString = `${colString}/Exercises`
          promises.push(ex(colString))
        } else {
          colString = `${colString}/SubCategories`
          promises.push(cat(colString))
        }
    })
    Promise.all(promises).then(ret => {
      console.log(ret)
      resolve(ret)
    })
  })
})
}

const zipObject = (keys = [], values = []) => {
  console.log("keys in zipObject: ", keys);
  console.log("values in zipObject: ", values);
  return keys.reduce((accumulator, key, index) => {
    accumulator[key] = values[index];
    return accumulator;
  }, {});
};

const getCollectionPromiseAll = async (obj, col, colType, admin) => {
  //CHANGE QUERY BASED ON COLTYPE
  let collection = currentCollection(col, colType);
  console.log("Getting collection: ", collection);
  firestore
    .collection(collection)
    .get()
    .then(colRef => {
      //GET SUBCOLLECTION OR EXERCISES
      console.log("colRef at " + collection, colRef);
      return Promise.all(
        colRef.forEach(key => {
          let content = key.data();
          console.log(`${collection}.${key.id}:`, content);
          let nextCollection = `${collection}/${key.id}`;
          if (content.last !== undefined) {
            return getCollectionPromiseAll(
              content,
              nextCollection,
              content.last ? "exercise" : "sub",
              admin
            );
          } else {
            return content;
          }
        })
      )
        .then(result => {
          console.log(`Result from ${collection}: `, result);
          obj = { ...obj, result };
          return obj;
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

export const fetchExercises = async admin => {
  let startCollection = "Gym/Imperia/Exercises";
  firestore
    .collection(startCollection)
    .get()
    .then(colRef => {
      Promise.all(async keys => {
        let results = [];
        for (const key in keys) {
          console.log("Iterating through colRef: ", key.data());
          let content = key.data();
          let nextCollection = `${startCollection}/${key.id}`;
          results.push(
            await getCollectionPromiseAll(
              content,
              nextCollection,
              content.last ? "exercise" : "sub",
              admin
            )
          );
        }
      });
    });
};

//LETS TRY AGAIN
//check if admin
//check if category is last

export const getAllFromFirestore = async admin => {
  let startCollection = "Gym/Imperia/Exercises";
  getCollectionFromFirestore(startCollection, "main", admin)
    .then(ret => {
      console.log("Return from getAllFromFirestore: ", ret);
      return ret;
    })
    .catch(err => console.log(err));
};

const mapThroughCollection = async (cols, colString, admin) => {
  let ret = {};
  let results = [];
  for await (const col of cols) {
    let thisDoc = col.data();
    //Doesn't return category unless active or user is admin
    if (thisDoc.active || admin) {
      ret[col.id] = thisDoc;
      let nextCol = `${colString}/${col.id}`;
      console.log(`ret[${col.id}]: `, thisDoc);
      //Only categories has .last as a key
      if (thisDoc.last !== undefined) {
        results.push(
          await getCollectionFromFirestore(
            nextCol,
            thisDoc.last ? "exercise" : "sub",
            admin
          )
        );
      } else {
        //thisDoc = exercise
        results.push(Promise.resolve(ret[col.id]));
      }
    }
  }
  console.log(`Array of promises from ${colString}: `, results);
  return results;
};

const getCollectionFromFirestore = async (ref, colType, admin) => {
  //Creates new collection string based on the type of collection
  let collection = currentCollection(ref, colType);
  console.log("Getting collection: ", collection);
  await firestore
    .collection(collection)
    .get()
    .then(colRef => {
      Promise.all(mapThroughCollection(colRef, collection, admin)).then(ret => {
        console.log(`Return from mapThroughCollection on ${collection}: `, ret);
        return ret;
      });
    })
    .catch(err => console.log(err));
};

const currentCollection = (col, colType) => {
  switch (colType) {
    case "main":
      return col;
    case "sub":
      return `${col}/SubCategories`;
    case "exercise":
      return `${col}/Exercises`;
    default:
      break;
  }
};