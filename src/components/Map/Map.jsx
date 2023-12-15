import GoogleMapReact from 'google-map-react';
// import { Paper, Typography, useMediaQuery } from "@material-ui/core";
// import LocationOnOutlined from "@material-ui/icons/LocationOnOutlined";
// import Rating from '@material-ui/lab';

import useStyles from './styles';

const Map = () => {
    const classes = useStyles();
    // const isMobile = useMediaQuery('(min-width:600px)');

    const coordinates = { lat: 0, lng: 0 }
    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBnpU3HbPxqd-7k4QfZ9S_Hl8Vf2U3rpeU' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
            
            >

            </GoogleMapReact>
        </div>
    )
}

export default Map