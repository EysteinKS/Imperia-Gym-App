import { normalize, schema } from "normalizr"
import { exercisesCombined } from "../dev/Database"

const exerciseSchema = new schema.Entity("exercises")

const categorySchema = new schema.Entity("categories", {
  exercises: [exerciseSchema],
  categories: [categorySchema]
})

const mainCategorySchema = new schema.Entity("", {})

const dataSchema = { exercisesAll: exercisesSchema }

export const normalizedExercises = normalize(exercisesCombined, dataSchema)
console.log(normalizedExercises)