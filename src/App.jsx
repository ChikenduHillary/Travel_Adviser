import { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api';
import Header from './components/Header/Header'
import List from './components/List/List';
import Map from './components/Map/Map';

function App() {
  const [places, setPlaces] = useState([])

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  
  useEffect(() => {
     navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
      setCoordinates({ lat: latitude, lng: longitude });
     })
  }, [])

  useEffect(() => {
    if (coordinates.lat && coordinates.lng) {
      // Ensure coordinates are available before calling getPlacesData
      getPlacesData(bounds.sw, bounds.ne)
        .then((data) => {
          console.log(data);
          setPlaces(data);
        })
        .catch((error) => {
          console.error('Error fetching places data:', error);
        });
    }
  }, [coordinates, bounds])

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3}  style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List places={places} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App


