import React, { Component } from "react"

class AdminContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            exercises: this.props.exercises
        }
    }

    render(){
        return(
            null
        )
    }
}

const categoryEditor = () => {

}

const exerciseEditor = () => {
    return(
        <div>
            <input name="name-NO"/>
            <input name="name-EN"/>
            <input name="ID"/>
        </div>
    )
}

export default AdminContainer