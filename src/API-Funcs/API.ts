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
    

    const response = await reviewsAPI.post('/events', eventInfo)
    return response.data

  
}

export const fetchEvent = async (eventName: string) => {
    const response = await reviewsAPI.get(`events/${eventName}`);
    return response.data;
}

export const fetchEventById = async (eventID: string) => {
    const response = await reviewsAPI.get(`events/${eventID}`);
    return response.data;
}

export const patchVotesByEventName = async (updateBody: any, eventName: any) => {
    //write event information into database

    const response = await reviewsAPI.patch(`/events/${eventName}`, { restaurantVotes : updateBody })
    return response.data

  
}



