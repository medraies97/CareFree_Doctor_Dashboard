import React from 'react';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import InfoIcon from '@material-ui/icons/Info';
import GridListTile from '@material-ui/core/GridListTile';
import IconButton from '@material-ui/core/IconButton';
import './film-card.scss';
import {Link} from "react-router-dom";   
import img from '../images/doctor.jpg';

class DoctorCard extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }
    render() {
        const doctor = this.props.doctor
        return (
            <div className="film-card">
                <GridListTile key={doctor.id}>
                    <img src = {img} alt={doctor.firstName} />
                    <GridListTileBar
                        title={<span>Name : {doctor.firstName}</span>}
                        subtitle={<span>Speciality: {doctor.speciality}</span>}
                        actionIcon={
                            <Link to={
                                { 
                                    pathname: '/doctorDetails',
                                    prop : {doctor}
                                }
                            }>
                            <IconButton aria-label={`info about ${doctor.firstName}`} className='icon-film'>
                                <InfoIcon />
                            </IconButton>
                            </Link>
                        }
                    />
                </GridListTile>
            </div>
        );
    }
}
export default DoctorCard;