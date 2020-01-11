import React from 'react' 
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import moment from 'moment'

class Signin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            code: '',
            cohort: 'Please Choose Your Cohort',
            name: 'Please Choose Your Name',
            cohortArray: [],
            cohortId: '',
            time: '',
            studentArray: []
        }
    }
    
    componentDidMount() {
        this.handleCohortFetch()
        let now = new Date
        now = moment(now).format('LT')
        console.log(now)
    }
    
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value})
        console.log(e.target)
    }

    handleCohortFetch = () => {
        axios.get('http://localhost:3001/cohorts').then(res => res).then((data) => {
            this.setState({ cohortArray: data.data })
        })
    }

    handleGetStudentsByCohortId = () => {
        axios.get(`http://localhost:3001/cohortstudents/${this.state.cohortId}`).then(res => res).then((data) => {
            this.setState({ studentArray: data.data})
        })
    }

    render() {
        return(
            <div style={{maxWidth: '450px', margin: '0 auto'}}>
                <div>
                    <br />
                    <h2>Please Clock In</h2>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Enter Code</Form.Label>
                        <Form.Control value={this.state.code} onChange={this.handleChange} name='code' type="code" />
                    </Form.Group>
                    {this.state.cohort === 'Please Choose Your Cohort' ?
                    <div>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Select Cohort</Form.Label>
                            <Form.Control name='cohort' onChange={this.handleChange} value={this.state.cohort} as="select">
                                <option>Please Choose Your Cohort</option>
                                {this.state.cohortArray.map((cohort, i) => {
                                    return <option value={cohort.id} key={i}>{cohort.name}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember My Cohort" />
                        </Form.Group>
                    </div>
                    : 
                    <div>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select Cohort</Form.Label>
                        <Form.Control value={this.state.name} as="select">
                            <option>Please Choose Your Name</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember My Name" />
                        </Form.Group>
                        <Button block variant='primary'>Clock In</Button>
                    </div>
                    }
                </div>
            </div>
        )
    }
}

export default Signin
