import { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api';
import Header from './components/Header/Header'
import List from './components/List/List';
import Map from './components/Map/Map';

function App() {
  const [places, setPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
     navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
      setCoordinates({ lat: latitude, lng: longitude });
      console.log({coordinates}, 'navigator')
     })
  }, [])

  useEffect(() => {
    setIsLoading(true);

    if (coordinates.lat && coordinates.lng) {
      // Ensure coordinates are available before calling getPlacesData
      getPlacesData(bounds.sw, bounds.ne)
        .then((data) => {
          console.log(data);
          setPlaces(data);
          setIsLoading(false);
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
          <List places={places} isLoading={isLoading} childClicked={childClicked} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App


