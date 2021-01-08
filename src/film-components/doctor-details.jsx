import React from 'react';
import './film-details.scss';
import { withRouter } from 'react-router';
import img from '../images/doctor.jpg';
import { Button, TextField } from '@material-ui/core';
import Axios from 'axios';
import { Link } from 'react-router-dom';


class DoctorDetails extends React.Component {
    constructor(props) {

        super(props);
        this.handleButton = this.handleButton.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleSubmitButton = this.handleSubmitButton.bind(this)
        if (typeof (props.location.prop) === 'undefined') {
            this.props.history.push('/')
        } else {
            this.state = {
                doctor: this.props.location.prop['doctor'],
                selectedDate: '',
                showForm: false
            };
        }

    }
    handleButton() {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            this.setState({
                showForm: true
            })
        } else {
            this.props.history.push('/login')
        }
    }
    async handleSubmitButton() {
        const user = JSON.parse(localStorage.getItem('user'))
        const obj = Object.assign({
            date: this.state.selectedDate,
            user: user.id
        })
        const headers = {
            'access_token': user.token
        }
        await Axios.post(`http://localhost:8081/appointments/${this.state.doctor.id}/add`, obj, {
            headers: headers
        })
    }
    handleDateChange = (e) => {
        this.setState({
            selectedDate: e.target.value
        });
    };
    componentDidMount() {
    }
    render() {
        const { doctor, selectedDate } = this.state
        return (
            <div className="content-search">
                <h1>First Name : {doctor.firstName}</h1>
                <div className="book">
                    <div className="book-pic">
                        <img src={img} alt={doctor.firstName} />
                    </div>
                    <div className="book-details">
                        <p><span className="subtitle" >Doctor LastName : </span> <span>{doctor.lastName} </span></p>
                        <p>
                            <span className="subtitle" >Speciality : </span>
                            <span>{doctor.speciality}</span>
                        </p>
                        <p><span className="subtitle" >Adress  :  </span> <span>{doctor.adress} </span></p>
                        <p><span className="subtitle" >Phone  : </span> <span>{doctor.phone} </span></p>
                        <div >
                            <Button onClick={this.handleButton} className="button-position" variant="outlined" color="secondary" >
                                Book an appointment
                            </Button>
                        </div>
                        <Link
                            to={{
                                pathname: "/video",
                                state: { phone: this.state.doctor.phone }
                            }}
                        >Create Video Conference Room</Link>
                        {this.state.showForm ?
                            (<div >
                                <TextField
                                    value={selectedDate} onChange={this.handleDateChange}
                                    id="datetime-local"
                                    label="Next appointment"
                                    type="datetime-local"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <Button onClick={this.handleSubmitButton} className="button-position-submit" variant="contained" color="primary" >
                                    Submit
                                </Button>
                            </div>) : ''
                        }
                    </div>
                </div>
            </div>

        );
    }
}
export default withRouter(DoctorDetails);