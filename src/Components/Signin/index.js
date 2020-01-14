import React from 'react' 
import { Form, Button, DropdownButton, Dropdown } from 'react-bootstrap'
import axios from 'axios'
import moment from 'moment'

let todaysDate = moment(new Date()).format('L')
const arriveLate = Date.parse(`${todaysDate} 09:21:00`)
const leaveEarly = Date.parse(`${todaysDate} 16:59:00`)
const fromSigninToOut = Date.parse(`${todaysDate} 15:00:00`)
let dateNow = new Date()
dateNow.getTime()

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
            outStatus: ''
        }
    }
    
    componentDidMount() {
        this.handleCohortFetch()
    }

    handleInOrOut = () => {
        // write to handle front end in or out
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
        this.setState({ cohortId: id}, () => this.handleGetStudentsByCohortId())
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
            if(dateNow > arriveLate) {
                console.log('you are late.')
                this.setState({ inStatus: 'late'}, () => this.handleSignInOutPost())
            } else {
                console.log('You are early')
                this.setState({ inStatus: 'on_time'}, () => this.handleSignInOutPost())
            }
        } else {
            if(dateNow < leaveEarly) {
                console.log('You are leaving early.')
                this.setState({ outStatus: 'early_leave'}, () => this.handleSignInOutPost())
            } else {
                console.log('Have a good day!')
                this.setState({ outStatus: 'on_time_leave'}, () => this.handleSignInOutPost())
            }
        }
    }

    handleSignInOutPost = () => {
        let dateNow = new Date()
        if(dateNow.getTime() < fromSigninToOut) {
            axios.post('http://localhost:3001/signins', {
                code: this.state.code,
                student_id: this.state.studentId,
                date: moment(dateNow).format('L'),
                in_status: this.state.inStatus,
                outStatus: this.state.outStatus
            }).then(res => res).then(date => console.log(date))
        } else {
            axios.post('http://localhost:3001/signouts', {
                code: this.state.code,
                student_id: this.state.studentId,
                date: moment(dateNow).format('L'),
                out_status: this.state.outStatus
            }).then(res => res).then(data => console.log(data))
        }
    }

    render() {
        let dateNow = new Date()
        dateNow.getTime()
        let inOrOut
        if (dateNow < fromSigninToOut) {
            inOrOut = 'In'
        } inOrOut = 'Out'

        return(
            <div style={{maxWidth: '450px', margin: '0 auto'}}>
                <div>
                    <br />
                    <h2>Please Clock {inOrOut}</h2>
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
                                    return <Dropdown.Item onClick={this.handleSelectCohort} value={cohort.id} key={i}>{cohort.name}</Dropdown.Item>
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
