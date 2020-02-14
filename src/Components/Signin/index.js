import React from 'react' 
import { Form, Button, DropdownButton, Dropdown } from 'react-bootstrap'
import axios from 'axios'
import moment from 'moment'

let todaysDate
let fromSigninToOut

(function() {
    todaysDate = moment(new Date()).format('L')
    fromSigninToOut = Date.parse(`${todaysDate} 13:00:00`)
})()

class Signin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inOrOut: 'In',
            code: '',
            cohort: 'Please Choose Your Cohort',
            name: 'Please Choose Your Name',
            cohortArray: [],
            cohortId: '',
            studentArray: [],
            studentId: '',
            time: '',
            inStatus: '',
            outStatus: '',
            signStatusArray: [],
            error: ''
        }
    }
    
    componentDidMount() {
        this.handleCohortFetch()
    }
    
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    handleCohortFetch = () => {
        axios.get('http://localhost:3001/cohorts').then(res => res).then((data) => {
            this.setState({ cohortArray: data.data })
        })
    }

    handleSelectCohort = (e) => {
        let id = e.target.getAttribute('value')
        let name = e.target.getAttribute('name')
        this.setState({ cohortId: id, cohort: name }, () => this.handleGetStudentsByCohortId())
    }

    handleGetStudentsByCohortId = () => {
        axios.get(`http://localhost:3001/cohortstudents/${this.state.cohortId}`).then(res => res).then((data) => {
            this.setState({ studentArray: data.data})
        })
    }

    handleSelectStudent = (e) => {
        let id = e.target.getAttribute('value')
        let name = e.target.getAttribute('name')
        this.setState({ 
            studentId: id,
            name
        })
    }

    handleSignInOutStatus = () => {
        let dateNow = new Date()
        dateNow.getTime()
        if (dateNow < fromSigninToOut) {
            this.setState({ inStatus: moment(dateNow).format('HH:mm')}, () => this.handleSignInOutPost())
        } else {
            this.setState({ outStatus: moment(dateNow).format('HH:mm')}, () => this.handleSignInOutPost())
        }
    }

    handleSignInOutPost = () => {
        let dateNow = new Date()
        if(dateNow.getTime() < fromSigninToOut) {
            // this.handleAbsenceHolidayWeekendCheck(dateNow)
            axios.post('http://localhost:3001/signins', {
                code: this.state.code,
                student_id: this.state.studentId,
                date: moment(dateNow).format('L'),
                in_status: this.state.inStatus,
                outStatus: this.state.outStatus
            }).then(res => res).then((data) => {
                console.log(data)
                if (data.data === "You already signed in.") {
                    this.setState({ error: data.data })
                } else if (data.data === "Invalid Code.") {
                    this.setState({ error: data.data })
                } else {
                    this.setState({ error: '' })
                }
            })
        } else {
            axios.post('http://localhost:3001/signouts', {
                code: this.state.code,
                student_id: this.state.studentId,
                date: moment(dateNow).format('L'),
                out_status: this.state.outStatus
            }).then(res => res).then(data => console.log(data))
        }
        let student = {
            name: this.state.name,
            cohort: this.state.cohort
        }
        let newArray = this.state.signStatusArray.concat(student)
        this.setState({ 
            signStatusArray: newArray,
            code: '',
            cohort: 'Please Choose Your Cohort',
            name: 'Please Choose Your Name',
            cohortId: '',
            studentArray: [],
            studentId: '',
            time: '',
            inStatus: '',
            outStatus: '',
            error: ''
         })
    }

    handleAbsenceHolidayWeekendCheck = (dateNow) => {
        axios.post('http://localhost:3001/attendancecheck', {
            student_id: this.state.studentId,
            date: moment(dateNow).format('L'),
        }).then(res => res).then((data) => console.log(data))
    }

    render() {
        let dateNow = new Date()
        dateNow.getTime()
        let inOrOut
        if (dateNow < fromSigninToOut) {
            inOrOut = 'In'
        } else {
            inOrOut = 'Out'
        } 

        return(
            <div style={{maxWidth: '450px', margin: '0 auto'}}>
                <div>
                    <br />
                    <h2>Please Clock {inOrOut}</h2>
                    <br />
                    {this.state.error !== '' ? 
                    <p style={{color: 'red'}}>{this.state.error}</p>
                    :
                    null
                    }
                    {this.state.signStatusArray.length > 0 ?
                    <div style={{display: this.state.error !== '' ? 'none' : null}}>
                        {this.state.signStatusArray.map((student, i) => {
                            return <p style={{color: 'green'}} key={i}>Signed {inOrOut} {student.name} in cohort {student.cohort}</p>
                        })}
                    </div>
                    :
                    null
                    }
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Enter Code</Form.Label>
                        <Form.Control value={this.state.code} onChange={this.handleChange} name='code' type="code" />
                    </Form.Group>
                    {this.state.studentArray.length === 0 ?
                    <div>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Select Cohort</Form.Label>
                            <DropdownButton id="dropdown-basic-button" title={this.state.cohort}>
                                {this.state.cohortArray.map((cohort, i) => {
                                    return <Dropdown.Item onClick={this.handleSelectCohort} name={cohort.name} value={cohort.id} key={i}>{cohort.name}</Dropdown.Item>
                                })}
                            </DropdownButton>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember My Cohort" />
                        </Form.Group>
                    </div>
                    : 
                    <div>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select Name</Form.Label>
                        <DropdownButton variant='success' id="dropdown-basic-button" title={this.state.name}>
                            {this.state.studentArray.map((student, i) => {
                                return <Dropdown.Item onClick={this.handleSelectStudent} name={student.name} value={student.id} key={i}>{student.name}</Dropdown.Item>
                            })}
                        </DropdownButton>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember My Name" />
                        </Form.Group>
                        <Button onClick={this.handleSignInOutStatus} block variant='primary'>Clock {inOrOut}</Button>
                    </div>
                    }
                </div>
            </div>
        )
    }
}

export default Signin
