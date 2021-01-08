import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import axios from 'axios';
import './film-search.scss'
import GridList from '@material-ui/core/GridList';
import ListSubheader from '@material-ui/core/ListSubheader';
import DoctorCard from './DoctorCard';

class DoctorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputFilm: '',
      doctorList: [],
    };
  }
  async initDoctors() {
    const res = await axios.get('http://localhost:8081/doctor');
    if (res.data) {
      const doctors = Object.keys(res.data).map((e) => {
        return {
          id: e,
          ...res.data[e]
        }

      })
      this.setState({
        doctorList: doctors
      })
    } else {
      this.setState({
        doctorList: []
      })
    }
  }
  async componentDidMount() {
    await this.initDoctors()
  }
  render() {
    const { doctorList } = this.state
    return (
      <div className="content-search">

        <GridList className='gridList'>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader className='subtitle-film-header' component="div">Liste des Medecins</ListSubheader>
          </GridListTile>
          {doctorList.map(doctor => (
            <DoctorCard key={doctor.id}
              doctor={doctor}
            />
          ))}
        </GridList>
            
      </div>
    );
  }
}
export default DoctorList;