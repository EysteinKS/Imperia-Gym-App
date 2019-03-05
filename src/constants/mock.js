const machines = [
    { name: "Push-up", weight: [
        1.5,
        2,
        2.5,
    ]},
    { name: "Sit-up", weight: [
        1.5,
        2,
        2.5
    ]}
]

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

export {
    machines,
    user,
    history
}