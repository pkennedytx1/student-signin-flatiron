import React from 'react'
import { Button, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import StudentTable from '../StudentTable'
import axios from 'axios'

class Dashboard extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            cohortArray: [],
            currentCohort: '',
            currentCohortName: ''
        }
    }

    componentDidMount() {
        this.handleCohortFetch()
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

    render() {
        return(
            <div style={{maxWidth: '800px', margin: '0 auto'}}>
                <br />
                <h1>Attendance Dashboard</h1>
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
                <StudentTable handleDelete={this.handleDelete} name={this.state.currentCohortName} cohort={this.state.currentCohort}/>
                : null
                }
                {/* Table Component Render Here */}
            </div>
        )
    }
}

export default Dashboard
