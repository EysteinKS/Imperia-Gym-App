import _ from "lodash"

export const nestObject = (input) => {
  //SEPARATES CATEGORIES AND EXERCISES, AND MAKES A NESTED OBJECT
  const { categories, exercises } = input
  let ret = recursiveCreate(categories)
  return { categories: ret, exercisesList: exercises}
}

const recursiveCreate = (input) => {
  //console.log("input in recursiveCreate: ", input)
  let ret = {}
  Object.keys(input).map((category) => {
    let cat = input[category]
    //console.log("cat in recursiveCreate: ", cat)
    //IF CATEGORY IS MAIN PARENT
    if(cat.location === undefined || cat.location.length == 0){
      let index = cat.id
      const { categories: omit1, exercises: omit2, location: omit3, ...rest } = cat
      ret[index] = rest
      if(!_.isEmpty(cat.exercises)){
        ret[index].exercises = cat.exercises
      }
      if(!_.isEmpty(cat.location)){
        ret[index].location = cat.location
      }
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
      const { categories: omit1, exercises: omit2, location: omit3, ...rest } = cat
      ret[index] = rest
      if(!_.isEmpty(cat.location)){
        ret[index].exercises = cat.exercises
      }
      if(!_.isEmpty(cat.location)){
        ret[index].location = cat.location
      }
      if(cat.categories !== undefined && cat.categories.length > 0){
        let children = recursiveChild(input, index)
        ret[index]["categories"] = children
      }
    }
  })
  return ret
}