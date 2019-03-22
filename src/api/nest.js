export const nestObject = (input) => {
  //SEPARATES CATEGORIES AND EXERCISES, AND MAKES A NESTED OBJECT
  const { categories, exercises } = input
  let ret = recursiveCreate(categories)
  return { categories: ret, exercisesList: exercises}
}

/*const getCategories = (input) => {
  let ret = {}
  Object.keys(categories).map(cat => {
    if(cat.location.length === 0) {
      //IF CATEGORY HAS NO PARENTS
      ret[cat.id] = { id: cat.id, active: cat.active }
      if(cat.location.length > 0) {
        ret[cat.id].location = cat.location
      }
      if(cat.exercises.length > 0){
        ret[cat.id].exercises = cat.exercises
      }
      if(cat.categories.length > 0){
        ret[cat.id].categories = {}
      }
    } else {
      //IF CATEGORY HAS A PARENT
      let locArr = cat.location.concat(cat.id)
      let loc = locArr.join(".categories.")
      ret[loc] = 
    }
  })
  return ret
}*/

const recursiveCreate = (input) => {
  //console.log("input in recursiveCreate: ", input)
  let ret = {}
  Object.keys(input).map((category) => {
    let cat = input[category]
    //console.log("cat in recursiveCreate: ", cat)
    //IF CATEGORY IS MAIN PARENT
    if(cat.location === undefined || cat.location.length == 0){
      let index = cat.id
      const { categories: omit, ...rest } = cat
      ret[index] = rest
      //IF CATEGORY HAS CHILDREN
      if(cat.categories !== undefined && cat.categories.length > 0){
        let children = recursiveChild(input, index)
        ret[index]["categories"] = children
      }
    }
  })
  console.log("return from recursiveCreate: ", ret)
  return ret
}

const recursiveChild = (input, parent) => {
  //console.log("input in recursiveChild: ", input)
  let ret = {}
  Object.keys(input).map((category) =>{
    let cat = input[category]
    let index = cat.id
    if(cat.location[cat.location.length - 1] === parent){
      ret[index] = cat
      if(cat.categories !== undefined && cat.categories.length > 0){
        let children = recursiveChild(input, index)
        ret[index]["categories"] = children
      }
    }
  })
  return ret
}