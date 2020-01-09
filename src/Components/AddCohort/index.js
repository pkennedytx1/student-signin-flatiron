import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class AddCohort extends React.Component {
    render() {
        return(
            <div style={{ maxWidth: '400px', margin: '0 auto'}}>
                <br />
                <Link to='/dashboard'>Back to Dashboard</Link>
                <br />
                <h2>Add Cohort</h2>
                <p>Please use the following format <b>MM/DD/YY</b></p>
                <br />
                <Form.Control type="date"/>
                <br />
                <Button>Add Cohort</Button>
            </div>
        )
    }
}

export default AddCohort