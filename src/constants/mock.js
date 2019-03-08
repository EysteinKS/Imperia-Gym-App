import { mapObject } from "../util"

const user = {
    username: "",
    email: "",
    sessions: [
        { date: "", sessionID: "" },
        { date: "", sessionID: "" }
    ],
    currentSession: {
        date: "",
        started: "",
        id: "",
        steps: [
            { machineID: 1, weight: 0, reps: 15 }
        ],
        done: ""
    }
}

const history = {

}

const exercisesFlat = input => {
    let obj = {}
    mapObject(input, (key) => {
        let firstKey = input[key]
        if(firstKey.name !== undefined){
            mapObject(firstKey, (secondKey) => {
                let nextKey = firstKey[secondKey]
                if(nextKey.name !== undefined) {
                    mapObject(nextKey, (thirdKey) => {
                        let lastKey = nextKey[thirdKey]
                        if(lastKey.name !== undefined ) {
                            console.log(String(lastKey.ID) + ": " + String(lastKey.name))
                            obj[thirdKey] = lastKey
                        }
                    })
                }
            })
        }
        
    })
    console.log("Returned object: ", obj)
    return obj
}

const exercises = {
    FreeWeights: {
        name: "Frivekt",
        FirstFloor: {
            name: "Første etasje",
            FF01: {
                ID: "FF01",
                name: "Benkpress",
                weightArray: [
                    "1 kg",
                    "2 kg",
                    "3 kg",
                    "4 kg",
                    "5 kg"
                ]
            },
            FF02: {
                ID: "FF02",
                name: "Skråbenk",
                weightArray: [
                    "1 kg",
                    "2 kg",
                    "3 kg",
                    "4 kg",
                    "5 kg"
                ]
            }
        },
        SecondFloor: {
            name: "Andre Etasje",
            SF01: {
                ID: "SF01",
                name: "Militærpress",
                weightArray: [
                    "1 kg",
                    "2 kg",
                    "3 kg",
                    "4 kg",
                    "5 kg"
                ]
            }
        }
    },
    Machines: {
        name: "Maskiner",
        Legs: {
            name: "Ben",
            L01: {
                ID: "L01",
                name: "Dytte benet opp",
                weightArray: [
                    "16 kg",
                    "17 kg",
                    "18 kg",
                    "19 kg"
                ]
            }
        },
        Shoulders: {
            name: "Skuldre",
            S02: {
                ID: "S02",
                name: "Løfte skuldre",
                weightArray: [
                    "15 kg",
                    "16 kg",
                    "17 kg",
                    "18 kg",
                    "19 kg"
                ]
            },
            S09: {
                ID: "S09",
                name: "Kald skulder",
                weightArray: [
                    "15 kg",
                    "16 kg",
                    "17 kg",
                    "18 kg",
                    "19 kg"
                ]
            }
        }
    }
}

export {
    exercises,
    exercisesFlat,
    user,
    history
}