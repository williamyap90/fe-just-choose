import axios from 'axios';

const reviewsAPI = axios.create({
    baseURL: "https://api.yelp.com/v3/businesses/",
});

// export const getRestaurants = async (filters: any) => {
//     const response = await reviewsAPI.get('/search', {
//         // params: {
          
//         // },
//         headers: {
//             Authorization : 'Bearer <api-key>'
//         }
//     });
//     console.log(response);
//     return response.data;

// }

const apikey = '<api-key>'
export const getRestaurants = async (filters: any) => {
    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
        headers: {
            'Authorization' : `Bearer ${apikey}`
        }
    })
   
    return response.data
}

