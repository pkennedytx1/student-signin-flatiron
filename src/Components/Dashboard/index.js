import React from 'react'
import { Button, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import StudentTable from '../StudentTable'
import StudentPage from '../StudentPage'
import axios from 'axios'

class Dashboard extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            cohortArray: [],
            currentCohort: '',
            currentCohortName: '',
            showStudentDetails: false,
            currentCode: '',
            currentStudentId: ''
        }
    }

    componentDidMount() {
        this.handleCohortFetch()
        this.handleCodeFetch()
    }

    handleCodeFetch = () => {
        axios.get('http://localhost:3001/code').then(res => res).then((data) => {
            this.setState({ currentCode: data.data })
        })
    }

    handleCohortFetch = () => {
        axios.get('http://localhost:3001/cohorts').then(res => res).then((data) => {
            this.setState({ cohortArray: data.data })
        })
    }

    handleCohortSelect = (e) => {
        let cohort = e.target.getAttribute('value')
        let name = e.target.getAttribute('name')
        this.setState({ 
            currentCohort: cohort,
            currentCohortName: name
        })
        
    }

    handleDelete = () => {
        this.setState({ currentCohort: '' })
        this.handleCohortFetch()
    }

    handleShowStudentDetails = (id) => {
        this.setState({
            showStudentDetails: true,
            currentStudentId: id
        })
    }

    handleHideStudentDetails = () => {
        this.setState({ showStudentDetails: false })
    }

    handleNewCode = () => {
        axios.post('http://localhost:3001/newcode').then(res => res).then(data => {
            this.setState({ currentCode: data.data })
        })
    }

    render() {
        return(
            <div style={{maxWidth: '800px', margin: '0 auto'}}>
                <br />
                <h1 style={{textAlign: 'center'}}><b>//Flatiron</b> Austin Attendance Dashboard</h1>
                <br />
                <h4 style={{textAlign: 'center'}}><b>Current Code:</b> {this.state.currentCode} | <Button onClick={this.handleNewCode} variant='outline-dark'>Get New Code</Button></h4>
                <br />
                <Row>
                    <Col>
                        <Link to='/addstudent'>
                            <Button block variant='outline-primary'>Add Student(s)</Button>
                        </Link>
                    </Col>
                    <Col>
                        <Link to='/addcohort'>
                            <Button block variant='outline-primary'>Add Cohort</Button>
                        </Link>
                    </Col>
                </Row>
                <br />
                {this.state.showStudentDetails ?
                <StudentPage hideDetails={this.handleHideStudentDetails} studentCohort={this.state.currentCohortName} studentId={this.state.currentStudentId} />
                :
                <div>
                <DropdownButton id="dropdown-basic-button" title="Choose a Cohort to View Attendance">
                    {this.state.cohortArray.length > 0 ? 
                        <div>
                        {this.state.cohortArray.map((cohort, i) => {
                            return <Dropdown.Item onClick={this.handleCohortSelect} name={cohort.name} key={i} value={cohort.id} href="#/action-1">{cohort.name}</Dropdown.Item>
                        })}
                        </div>
                    : null
                    }
                </DropdownButton>
                <br />
                {this.state.currentCohort !== '' ?
                <StudentTable handleShowStudent={this.handleShowStudentDetails} handleDelete={this.handleDelete} name={this.state.currentCohortName} cohort={this.state.currentCohort}/>
                : null
                }
                </div>
                }
            </div>
        )
    }
}

export default Dashboard
