import React from 'react';
import './App.scss';
import Container from '@material-ui/core/Container';
import {BrowserRouter ,Switch,Route} from "react-router-dom";
import NotFound from './film-components/not-found';
import DoctorList from './film-components/DoctorList';
import doctorDetails from './film-components/doctor-details';
import Login from './login-component/login';
import Calendar from './Calendar/Calendar';
import Axios from 'axios';
import VideoConference from './video/VideoConference';


class App extends React.Component{

  componentDidMount() {
    Axios.interceptors.response.use(response => {
      return response;
   }, error => {
     if (error.response.status === 401) {
      this.props.history.push('/login')
     }
     return error;
   });
  }
  render(){
    return ( 
      <div className = "App" >
        <div className="navbar">
          <Container fixed >
          < img className = "img-fluid"
          alt = "logo brand nobo noir"
          src = {require('./images/logoPIM.png')} /> 
          </Container> 
        </div> 
        <Container fixed className="content">
        <BrowserRouter>
          <Switch>
                <Route exact path='/' component={DoctorList} />
                <Route exact path='/doctorDetails' component={doctorDetails} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/calendar' component={Calendar} />
                <Route exact path='/video' component={VideoConference} />
                <Route path='*' exact={true} component={NotFound} />
          </Switch>
        </BrowserRouter>
        </Container>
      </div>
    );
  }

}

export default App;