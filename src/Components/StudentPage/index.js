import React from 'react'
import axios from 'axios'
import { Row, Col, Table, Button } from 'react-bootstrap'
import {Pie} from 'react-chartjs-2'
import moment from 'moment'

class StudentPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signinsArray: [],
            tardies: 0,
            absences: 0,
            total: 0,
            attendance: 100,
            name: '',
            cohort: '',
            totalDays: 0
        }
    }

    componentDidMount() {
        this.handleSigninsFetch()
        this.handleGetStudentById()
    }

    handleSigninsFetch = () => {
        axios.get(`http://localhost:3001/signins/${this.props.studentId}`).then(res => res).then((data) => {
            this.setState({ signinsArray: data.data.reverse() })
        })
    }

    handleGetStudentById = () => {
        axios.get(`http://localhost:3001/students/${this.props.studentId}`).then(res => res).then((data) => {
            this.setState({
                tardies: data.data[0].tardies,
                absences: data.data[0].absences,
                name: data.data[0].name,
                total: Math.floor(data.data[0].tardies / 3) + data.data[0].absences,
            }, () => this.handleDateRange())
        })
    }

    handleDateRange = () => {
        let start = moment(this.props.studentCohort, "MM/DD/YY")
        let now = moment(new Date()).format('MM/DD/YY')
        let total = moment.duration(start.diff(now)).asDays() * -1
        this.setState({
            attendance: 100 - (this.state.total * total),
            totalDays: total
        })
        console.log(total)
    }

    handleSignInDelete = (id) => {
        axios.delete(`http://localhost:3001/signins/${id}`).then(res => res).then(data => {
            this.handleSigninsFetch()   
        })
    }
    
    render() {
        const data = {
            labels: [
                'Absences',
                'Present',
                'Tardies'
            ],
            datasets: [{
                data: [this.state.absences, this.state.totalDays-this.state.absences-this.state.tardies, this.state.tardies],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }]
        };

        return(
            <div>
                <br />
                <p style={{cursor: 'pointer', color: 'blue'}} onClick={() => this.props.hideDetails()}>Back to Students Table</p>
                <br />
                <h2 style={{textAlign: 'center'}}>Attendance Summary</h2>
                <h4 style={{textAlign: 'center'}}>{this.state.name}</h4>
                <hr />
                <Row style={{textAlign: 'center'}}>
                    <Col>
                        <h4>Tardies</h4>
                        <h1>{this.state.tardies}</h1>
                    </Col>
                    <Col>
                        <h4>Absences</h4>
                        <h1>{this.state.absences}</h1>
                    </Col>
                    <Col>
                        <h4>Total</h4>
                        <h1>{this.state.total}</h1>
                    </Col>
                    <Col>
                        <h4>Attendance</h4>
                        <h1>{this.state.attendance}%</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <hr />
                        <Pie data={data} />
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>In Status</th>
                                    <th>Out Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.signinsArray.map((signin,i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{signin.date}</td>
                                            <td>{signin.in_status}</td>
                                            <td>{signin.out_status}</td>
                                            <td>
                                                <Button>Edit</Button>
                                                <Button onClick={() => this.handleSignInDelete(signin.id)} variant='danger'>Delete</Button>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default StudentPage
