import { useState } from "react";
import { IUser } from "../Interfaces/Interfaces"
import RestaurantFinalList from "./RestaurantFinalList";
import EventConfirmation from "./EventConfirmation";
import RestaurantSelection from "./RestaurantSelection";

interface Props {
  loggedInUser: IUser;
}

const OrganiserLandingPage = (props: Props) => {
  const [eventConfirmed, setEventConfirmed] = useState(false); //for conditional rendering of event confirmation page
  const [reviewingShortlist, setReviewingShortlist] = useState(false); //for conditional rendering of the shortlist review
  const [restaurantShortlist, setRestaurantShortlist] = useState([]); //restaurants organiser has added to shortlist
  const [eventName, setEventName] = useState(''); 
  const [nameChosen, setNameChosen] = useState(false);

  if(reviewingShortlist) 
    return <RestaurantFinalList nameChosen={nameChosen} setNameChosen={setNameChosen} eventName={eventName} setEventName={setEventName} loggedInUser={props.loggedInUser} setEventConfirmed={setEventConfirmed} restaurantShortlist={restaurantShortlist} setRestaurantShortlist={setRestaurantShortlist} setReviewingShortlist={setReviewingShortlist}/>
  if(eventConfirmed)
    return <EventConfirmation eventName={eventName} setEventName={setEventName} />

  //if reviewingshortlist and eventconfirmation are both false then render the restaurantselection page
  return <RestaurantSelection loggedInUser={props.loggedInUser} setRestaurantShortlist={setRestaurantShortlist} restaurantShortlist={restaurantShortlist} setReviewingShortlist={setReviewingShortlist}/>

};

export default OrganiserLandingPage;
