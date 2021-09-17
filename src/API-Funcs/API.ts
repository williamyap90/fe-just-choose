import axios from 'axios';

// const reviewsAPI = axios.create({
//     baseURL: "https://api.yelp.com/v3/businesses/",
// });

// temporarily connecting to Scott's backend project. Will need to be updated to just-choose-be later
const reviewsAPI = axios.create({
    baseURL: "https://nc-games-scott.herokuapp.com/api/",
});
// const API_KEY = 'AIzaSyD3QQCQCFIPYHD-G8EsFLme0M3ToQb_byM';
// const reviewsAPI = axios.create({
//     baseURL: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+toronto+canada&key=AIzaSyD3QQCQCFIPYHD-G8EsFLme0M3ToQb_byM`,
// });

//api key now stored in backend - can be deleted soon
// const API_KEY = process.env.REACT_APP_API_KEY;

export const getRestaurants = async (filters: any) => {
    const response = await reviewsAPI.get('/restaurants', 
    {
        params: {
          location : filters.location,
          radius : filters.radius,
          limit : filters.limit,
          sort_by : filters.sort_by,
          price : filters.price,
          offset : filters.offset
        },
       
    });
    
    return response.data;
}





// export const getRestaurants = async (filters: any) => {
//     const response = await reviewsAPI.get('/restaurants'); 
//     // {
//         // params: {
          
//         // },
//         // headers: {
//         //     Authorization : `Bearer ${API_KEY}`
//         // }
//     // });
//     console.log('hi');
//     console.log(response);
//     console.log(response.data);
//     return response.data;

// }

// export const getRestaurants = async (filters: any) => {
//     const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+toronto+canada&key=AIzaSyD3QQCQCFIPYHD-G8EsFLme0M3ToQb_byM', {
//         // headers: {
//         //     'Authorization' : `Bearer ${API_KEY}`
//         // }
//     })
//     console.log('test');
//     return response.data
// }

// export const getRestaurants = async () => {
//     fetch(`https://api.yelp.com/v3/businesses/search`, {
//         Headers : {
//             Authorization : API_KEY
//         }
//     })
//         .then(response => response.json())
//         .then(data => {
//             return data;
//         })
// }
