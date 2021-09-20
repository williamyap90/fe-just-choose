import axios from 'axios';


const reviewsAPI = axios.create({
    baseURL: "https://nc-games-scott.herokuapp.com/api/",
});


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

export const saveEvent = async (eventInfo: any) => {
    //write event information into database

    console.log('WRITING TO DATABASE')
    console.log(eventInfo);
}



