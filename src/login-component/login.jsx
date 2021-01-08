import React from 'react';
import { TextField, Button } from '@material-ui/core';
import Axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            error: false,
            email: '',
            emailError: false,
            password: ''
        }
        this.handleClick = this.handleClick.bind(this)
    }
    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    async handleClick() {
        console.log('dl')
        if (this.validateEmail(this.state.email)) {
            this.setState({ emailError: false })
            const login = Object.assign({
                email: this.state.email,
                password: this.state.password
            })
            try {
                const result = await Axios.post('http://localhost:8081/login', login)
                const data =Object.assign( {
                    user: result.data.doctor ? false : true,//false
                    doctor: result.data.doctor ? true : false ,//true
                    doctorId: result.data.doctor ? Object.keys(result.data.doctor)[0] : '' ,
                    token: result.data.accessToken,
                    userId: result.data.id,
                })
                console.log(data)
                localStorage.setItem('user', JSON.stringify(data));
                if(data.doctor){
                    this.props.history.push('/calendar')
                }else if (data.user){
                    this.props.history.push('/')
                }
            } catch (e) {
                console.log('ddadaza')
                this.setState({ error: true })
            }
        } else {
            this.setState({ email: '', emailError: true })
        }
    }
    async componentDidMount() {
        localStorage.clear();
    }
    render() {
        return (
            <div className="content-search-login">
                <h1>Login</h1>
                {this.state.error ? (<p>Error</p>) : ''}
                <form noValidate autoComplete="off">
                    <TextField
                        id="standard-password-input"
                        label="Email"
                        required
                        type="email"
                        value={this.state.email}
                        error={this.state.emailError}
                        helperText={this.state.emailError ? 'Incorrect Email.' : null}
                        onChange={(event) => this.setState({ email: event.target.value })}
                    />
                    <br />
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        required
                        type="password"
                        autoComplete="current-password"
                        onChange={(event) => this.setState({ password: event.target.value })}
                    />
                    <br />
                    <br />
                    <br />
                    <Button variant="contained" color="primary" onClick={() => this.handleClick()}>
                        Submit
                    </Button>
                </form>
            </div>
        );
    }
}
export default Login;