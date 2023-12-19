import axios from 'axios';

const URL =  'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';


export const getPlacesData = async (sw, ne) => {
  if (!sw || !ne || !sw.lat || !sw.lng || !ne.lat || !ne.lng) {
    console.error('Invalid coordinates provided for getPlacesData');
    return []; // Return a default value or throw an error as needed
  }
  
  try {
      const { data: { data } } = await axios.get(URL, {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          'X-RapidAPI-Key': '0e4452703fmshe420c5509b4d008p1c0d7cjsn3b53a37c27bc',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
      });
      return data;
  } catch(error) {
    console.log(error);
  }
}