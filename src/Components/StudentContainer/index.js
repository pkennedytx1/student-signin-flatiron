import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'

class StudentContainer extends React.Component {
    constructor(props) {
        super(props) 
        this.state ={
            newStudentArray: [],
            studentName: '',
            studentCohort: '',
            studentEmail: '',
            cohortArray: []
        }
    }

    componentDidMount() {
        this.handleCohortFetch()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCohortFetch = () => {
        axios.get('http://localhost:3001/cohorts').then(res => res).then((data) => {
            this.setState({ cohortArray: data.data })
        })
    }

    handleSelect = (e) => {
        this.setState({
            studentCohort: e.target.value
        })
    }

    addStudent = () => {
        this.handleStudentCreate()
        let student = {
            name: this.state.studentName,
            cohort: this.state.studentCohort
        }
        let newArray = this.state.newStudentArray.concat(student)
        this.setState({ 
            newStudentArray: newArray,
            studentName: '',
            studentCohort: '',
            studentEmail: ''
        })
    }

    handleStudentCreate = () => {
        let cohort_id = this.state.studentCohort
        cohort_id = parseInt(cohort_id)
        axios.post('http://localhost:3001/students', {
            name: this.state.studentName,
            email: this.state.studentEmail,
            cohort_id,
            tardies: 0,
            absences: 0
        }).then(res => res).then(data => console.log(data))
    }

    render() {
        return(
            <div style={{maxWidth: '400px', margin: '0 auto'}} >
                <br />
                <Link to='/dashboard'>Back to Dashboard</Link>
                <br />
                <br />
                {this.state.newStudentArray.length > 0 ? 
                <div>
                    {this.state.newStudentArray.map((student, i) => (
                        <h6 style={{color: 'green'}} key={i}>{`${student.name} was added successfully.`}</h6>
                    ))}
                </div>
                : null}
                <br />
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Student Name</Form.Label>
                    <Form.Control onChange={this.handleChange} name='studentName' type="name" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Student Email</Form.Label>
                    <Form.Control onChange={this.handleChange} name='studentEmail' type="email" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Please Choose a Cohort</Form.Label>
                    <Form.Control value={this.state.studentCohort} name='studentCohort' onChange={this.handleChange} as="select">
                        <option value='Please Select a Cohort'>Please Select a Cohort</option>
                        {this.state.cohortArray.map((cohort, i) => {
                            return <option key={i} value={cohort.id} >{cohort.name}</option>
                        })}
                    </Form.Control>
                </Form.Group>
                <Button onClick={this.addStudent} variant='primary'>Add Student</Button>
            </div>
        )
    }
}

export default StudentContainer