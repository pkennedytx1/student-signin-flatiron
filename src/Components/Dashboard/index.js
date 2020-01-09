import React from 'react'
import { Button, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Dashboard extends React.Component {
    render() {
        return(
            <div style={{maxWidth: '700px', margin: '0 auto'}}>
                <h2>Attendance Dashboard</h2>
                <br />
                <Row>
                    <Col>
                        <Link to='/addstudent'>
                            <Button block variant='outline-primary'>Add Student(s)</Button>
                        </Link>
                        {/* Add Student => component */}
                    </Col>
                    <Col>
                        <Button block variant='outline-primary'>Add Cohort</Button>
                        {/* Add Cohort => component */}
                    </Col>
                </Row>
                <br />
                <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                    {/* map over all cohorts */}
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                </DropdownButton>
                {/* Select Cohort => Table with students => Specific Student */}
                {/* Table Component Render Here */}
            </div>
        )
    }
}

export default Dashboard
