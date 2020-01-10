import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'

class AddCohort extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cohort: "",
            successArray: []
        }
    }

    handleChange = (e) => {
        let date = moment( e.target.value).format('MM/DD/YY')
        this.setState({ [e.target.name]: date})
    }

    handleCohortAddition = () => {
        let newArray = this.state.successArray.concat(this.state.cohort)
        this.setState({ successArray: newArray })
        let name = this.state.cohort
        axios.post('http://localhost:3001/cohorts', {
            name
        }).then(response => response).then(data => console.log(data))
    }

    render() {
        console.log(this.state)
        return(
            <div style={{ maxWidth: '400px', margin: '0 auto'}}>
                <br />
                <Link to='/dashboard'>Back to Dashboard</Link>
                <br />
                <br />
                {this.state.successArray.length > 0 ? 
                <div>
                    {this.state.successArray.map((cohort, i) => {
                    return <h6 key={i} style={{color: 'green'}}>{cohort} was added to the database.</h6>
                    })}
                </div>
                : null }
                <br />
                <h2>Add Cohort</h2>
                <Form.Control onChange={this.handleChange} name='cohort' type="date"/>
                <br />
                <Button onClick={this.handleCohortAddition} block>Add Cohort</Button>
            </div>
        )
    }
}

export default AddCohort