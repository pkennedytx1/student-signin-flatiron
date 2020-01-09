import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class StudentContainer extends React.Component {
    constructor(props) {
        super(props) 
        this.state ={
            newStudentArray: [],
            studentName: '',
            studentCohort: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSelect = (e) => {
        this.setState9({
            studentCohort: e.target.value
        })
    }

    addStudent = () => {
        let student = {
            name: this.state.studentName,
            cohort: this.state.studentCohort
        }
        let newArray = this.state.newStudentArray.concat(student)
        this.setState({ 
            newStudentArray: newArray,
            studentName: '',
            studentCohort: ''
        })
    }

    render() {
        console.log(this.state)
        return(
            <div style={{maxWidth: '400px', margin: '0 auto'}} >
                <br />
                <Link to='/dashboard'>Back to Dashboard</Link>
                <br />
                {this.state.newStudentArray.length > 0 ? 
                <div>
                    <h2>Added Students</h2>
                    {this.state.newStudentArray.map((student, i) => (
                        <h6 key={i}>{`Student: ${student.name}, Cohort: ${student.cohort}`}</h6>
                    ))}
                </div>
                : null}
                <br />
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Student Name</Form.Label>
                    <Form.Control onChange={this.handleChange} name='studentName' type="name" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Please Choose a Cohort</Form.Label>
                    <Form.Control value={this.state.studentCohort} name='studentCohort' onChange={this.handleChange} as="select">
                        <option value='Please Select a Cohort'>Please Select a Cohort</option>
                        <option value='01/27/20'>01/27/20</option>
                        {/* map cohorts */}
                    </Form.Control>
                </Form.Group>
                <Button onClick={this.addStudent} variant='primary'>Add Student</Button>
            </div>
        )
    }
}

export default StudentContainer