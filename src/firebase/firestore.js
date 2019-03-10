import { firestore } from "./firebase";

export const getExercises = () => {
    firestore.collection("Excercies").get()
        .then((docref) => {
            docref.docs.map(doc => { console.log(doc.data()); doc.listCollections().then(
                collections => collections.docs.map(doc => console.log(doc.data()))
            ) }) 
        })
        .catch(err => console.log("Error: ", err))
}