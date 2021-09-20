import axios from 'axios';
import { IFilters } from '../Components/Interfaces/Interfaces'


const reviewsAPI = axios.create({
    baseURL: "https://just-choose.herokuapp.com/api",
});


export const getRestaurants = async (filters: IFilters) => {
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
    console.log(eventInfo.endDate)
    

    const response = await reviewsAPI.post('/events', 
    eventInfo)
    console.log(response.data)
    return response.data

    console.log('WRITING TO DATABASE')
    console.log(eventInfo);
}



