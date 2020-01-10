import React from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'

class StudentTable extends React.Component {
    
    handleCohortDelete = () => {
        console.log(this.props.cohort)
        axios.delete(`http://localhost:3001/cohorts/${this.props.cohort}`).then(res => res).then((data) => {
            this.props.handleDelete()
        })
    }

    render() {
        return(
            <div>
                <h2>Cohort: {this.props.name}</h2>
                <Button onClick={this.handleCohortDelete} variant='danger'>Delete Cohort</Button>
            </div>
        )
    }
}

export default StudentTable
