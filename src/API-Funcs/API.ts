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
    console.log('Posting to database:')
    console.log(eventInfo)
    

    const response = await reviewsAPI.post('/events', eventInfo)
    console.log('response from database: ')
    console.log(response.data)
    return response.data

  
}

export const fetchEvent = async (eventName: string) => {
    console.log(`fetching event from database. with eventname ${eventName}`)
    const response = await reviewsAPI.get(`events/${eventName}`);
    console.log('response from database:')
    console.log(response.data);
    return response.data;
}

export const fetchEventById = async (eventID: string) => {
    console.log('fetching event by ID from database...')
    const response = await reviewsAPI.get(`events/${eventID}`);
    console.log('response from database:')
    console.log(response.data);
    return response.data;
}

export const patchVotesByEventName = async (updateBody: any, eventName: any) => {
    //write event information into database
    console.log(`Patching to database. Event name: ${eventName}`)
    console.log(`Patched with body:`)
    console.log(updateBody);

    const response = await reviewsAPI.patch(`/events/${eventName}`, { restaurantVotes : updateBody })
    console.log('response from database: ')
    console.log(response.data)
    return response.data

  
}



