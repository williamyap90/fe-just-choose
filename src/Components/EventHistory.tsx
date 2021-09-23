import React, { useEffect, useState } from 'react'
import { fetchEventByOrganiser } from '../API-Funcs/API';
import Loading from './OrganiserJourney/SubComponents/Loading';
import Boxes from '../CSS/Boxes.module.css';
import Images from '../CSS/Images.module.css';
import Paragraphs from '../CSS/Paragraphs.module.css';
import { Link } from 'react-router-dom';

export default function EventHistory(props: any) {
    console.log(props.loggedInUser)
    const [eventHistory, setEventHistory] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchEventByOrganiser(props.loggedInUser.name)
        .then((response) => {
            setEventHistory(response.events);
            setIsLoading(false);
        })
    }, [])
    if(eventHistory)
    console.log(eventHistory[0]);

    if(isLoading) 
      return <Loading />
    return (
        <div>
           <h1>Hi {props.loggedInUser.name}</h1>
           <h2>Here is your event history:</h2>
           { eventHistory && eventHistory.map((event: any) => {
               return (
                <div key={event.restaurantList[0].restaurant_id} className={Boxes["restaurant-info-container"]}>
              <p className={Paragraphs["restaurant-info-title"]}>
                  Event name: {event.eventName}{" "}
                </p>
                <p className={Paragraphs["restaurant-info-title"]}>
                  Event date: {event.endDate}{" "}
                </p>
              
                <p className={Paragraphs["restaurant-info-title"]}>
                  Link to full event information: <Link to={'/event/' + event?.eventName}>Here</Link>{" "}
                </p>
                <p className={Paragraphs["restaurant-info-title"]}>
                 Winning restaurant: {event.restaurantList[0].restaurantName}{" "}
                </p>
                <p className={Paragraphs["restaurant-info-subtitle"]}>
                  {event.restaurantList[0].categories.map((category: string, index: number) => {
                    return index < 5 && category + " . ";
                  })}
                </p>    
    
                <img
                  className={Images["restaurant-info-picture"]}
                  src={event.restaurantList[0].imageUrl}
                ></img>
                <p className={Paragraphs["restaurant-info-additional"]}>
                  Rating - {event.restaurantList[0].rating}
                </p>
                <p className={Paragraphs["restaurant-info-additional"]}>
                  <a href={event.restaurantList[0].url}>Website</a>
                </p>
                <p>Total votes: {event.restaurantList[0].upvotes}</p>
        
              </div> 
               )
           })}
        </div>
    )
}
