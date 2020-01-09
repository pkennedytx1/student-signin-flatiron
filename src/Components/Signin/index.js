import React from 'react' 
import { Form, Button } from 'react-bootstrap'

class Signin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            code: '',
            cohort: 'Please Choose Your Cohort',
            name: 'Please Choose Your Name'
        }
    }
    render() {
        return(
            <div style={{maxWidth: '450px', margin: '0 auto'}}>
                <div>
                    <br />
                    <h2>Please Clock In</h2>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Enter Code</Form.Label>
                        <Form.Control name='code' type="code" />
                    </Form.Group>
                    {this.state.cohort === 'Please Choose Your Cohort' ?
                    <div>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Select Cohort</Form.Label>
                            <Form.Control as="select">
                                <option>Please Choose Your Cohort</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
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
                        <Form.Control as="select">
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
