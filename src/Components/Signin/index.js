import React from 'react' 

class Signin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            cohortArray: ['01/27/20'],
            cohort: 'Please Select Your Cohort',
        }
    }

    render() {
        return(
            <div>
                <div>
                    <h2>Please Clock In</h2>
                    
                </div>
            </div>
        )
    }
}

export default Signin
