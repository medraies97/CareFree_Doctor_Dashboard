
import React, { Component } from 'react';
import axios from "axios";
import 'react-big-scheduler/lib/css/style.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'  


const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  state = {
    appointments: [],
    modal: false,
    selectedEvent: {},
    startDate: new Date(),
    endDate: new Date()
  }
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onSelectEvent = this.onSelectEvent.bind(this);
  }
  onSelectEvent(event, e) {
    this.setState(prevState => ({
      modal: !prevState.modal,
      selectedEvent: {
        name: event.title,
        description: event.description
      },
      startDate: event.start,
      endDate: event.end
    }));
    console.log(event);
  }
  toggle() {
    console.log('dkhlt')
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  async initDoctors(user) {
    const id = user.doctorId;

    const res = await axios.get(`http://localhost:8081/doctor/show/${id}`);
    //const res = await axios.get(`http://localhost:8081/doctor/show/-M9_5pj1A-BkUQgiqRvO`);
    return res.data
  }
  async componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'))
    if(!user){
      this.props.history.push('/login')
      return 
    }else if (!user.doctor){
      this.props.history.push('/')
      return 
    }
    const appointments = [];
    const doctor = await this.initDoctors(user)
    if(doctor.appointments){
      const appointmentArray = Object.keys(doctor.appointments).map((e) => {
        return {
          id: e,
          ...doctor.appointments[e]
        }
  
      })
      //if(appoinx)
        appointmentArray.map(appointment=>{
          let e = {
            id: doctor.phone,
            title: doctor.firstName,
            description: doctor.speciality,
            start: new Date(appointment.date),
            end: new Date(appointment.date)
          }
          appointments.push(e);
        })
        this.setState({
          appointments: appointments
        })
  
    }
    
    
  }



  render() {
    return (
      <div className="animated fadeIn">


        <BigCalendar
          localizer={localizer}
          events={this.state.appointments}
          defaultView='month'
          views={['month', 'week', 'day']}
          defaultDate={new Date()}
          onSelectEvent={this.onSelectEvent}
        />
      </div>)


  }
}


//export default withDragDropContext(Calendar);
export default (Calendar);
