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

const exercisesFlat = (input, lang)=> {
    let obj = {}
    mapObject(input, (key) => {
        let firstKey = input[key]
        if(firstKey.name[lang] !== undefined){
            mapObject(firstKey, (secondKey) => {
                let nextKey = firstKey[secondKey]
                if(nextKey.name[lang] !== undefined) {
                    mapObject(nextKey, (thirdKey) => {
                        let lastKey = nextKey[thirdKey]
                        if(lastKey.name[lang] !== undefined ) {
                            obj[thirdKey] = lastKey
                        }
                    })
                }
            })
        }
        
    })
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
            },
            FF03: {
                ID: "FF03",
                name: "Squats",
                weightArray: [
                    "1 kg",
                    "2 kg",
                    "3 kg",
                    "4 kg",
                    "5 kg"
                ]
            },
            FF04: {
                ID: "FF04",
                name: "Trapp",
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
            },
            SF02: {
                ID: "SF02",
                name: "Gruppepress",
                weightArray: false
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
        },
        Arms: {
            name: "Armer",
            A01: {
                ID: "A01",
                name: "Armpress",
                weightArray: [
                    "1 kg",
                    "5 kg"
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