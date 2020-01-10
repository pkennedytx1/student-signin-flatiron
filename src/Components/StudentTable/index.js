import React from 'react'
import axios from 'axios'
import { Button, Table, Toast } from 'react-bootstrap'

class StudentTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            studentArray: [],
            show: false
        }
    }

    componentDidMount() {
        this.handleGetStudentsByCohortId()
    }
    
    handleCohortDelete = () => {
        axios.delete(`http://localhost:3001/cohorts/${this.props.cohort}`).then(res => res).then((data) => {
            this.props.handleDelete()
        })
    }

    handleStudentDelete = (e) => {
        let studentId = e.target.getAttribute('id')
        axios.delete(`http://localhost:3001/students/${studentId}`).then(res => res).then(data => (
            this.handleGetStudentsByCohortId()
        ))
    }

    handleGetStudentsByCohortId = () => {
        axios.get(`http://localhost:3001/cohortstudents/${this.props.cohort}`).then(res => res).then((data) => {
            this.setState({ studentArray: data.data})
        })
    }

    render() {
        return(
            <div style={{position: 'relative'}}>
                <Toast style={{ zIndex: '2', position: 'absolute', top: '-74px', right: '0'}} onClose={() => this.setState({ show: false })} show={this.state.show} delay={3000} autohide>
                <Toast.Header style={{color: 'black', backgroundColor: '#FFC9BE'}}>
                    <strong className="mr-auto">//FlatironAustin</strong>
                    <small>now</small>
                </Toast.Header>
                <Toast.Body style={{color: 'red', backgroundColor: '#FFE8E3'}}>Please make sure all students are deleted before deleting a cohort.</Toast.Body>
                </Toast>
                <h2>Cohort: {this.props.name}</h2>
                <p>Note: Students are sorted by most tardies + abesences.</p>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Cohort</th>
                            <th></th>
                        </tr>
                    </thead>
                    {this.state.studentArray.length > 0 ?
                    <tbody>
                        {this.state.studentArray.map((student, i) => {
                            return(
                                <tr key={i}>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{this.props.name}</td>
                                    <td><Button onClick={this.handleStudentDelete} id={student.id} variant='danger'>Delete</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                    : null }
                </Table>
                {this.state.studentArray.length !== 0 ?
                <Button onClick={() => this.setState({ show: true })} variant='warning'>Delete Cohort</Button>
                :
                <Button onClick={this.handleCohortDelete} variant='danger'>Delete Cohort</Button>
                }
            </div>
        )
    }
}

export default StudentTable
