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

const exercises = {
    FreeWeights: {
        FirstFloor: {
            FF01: {
                ID: "FF01",
                name: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
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
                name: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
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
            SF01: {
                ID: "SF01",
                name: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
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
        Legs: {
            L01: {
                ID: "L01",
                name: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                weightArray: [
                    "16 kg",
                    "17 kg",
                    "18 kg",
                    "19 kg"
                ]
            }
        },
        Shoulders: {
            S02: {
                ID: "S02",
                name: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
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
                name: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
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
    user,
    history
}