import React from 'react'
import { Row, Col } from 'react-bootstrap'
import {Pie} from 'react-chartjs-2'

const data = {
	labels: [
		'Absences',
		'Present',
		'Tardies'
	],
	datasets: [{
		data: [3, 67, 5],
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

class StudentPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return(
            <div>
                <br />
                <h2 style={{textAlign: 'center'}}>Attendance Summary</h2>
                <hr />
                <Row style={{textAlign: 'center'}}>
                    <Col>
                        <h4>Tardies</h4>
                        <h1>3</h1>
                    </Col>
                    <Col>
                        <h4>Absences</h4>
                        <h1>1</h1>
                    </Col>
                    <Col>
                        <h4>Total</h4>
                        <h1>2</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <hr />
                        <Pie data={data} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <hr />
                        
                    </Col>
                </Row>
            </div>
        )
    }
}

export default StudentPage
