import Boxes from "../../CSS/Boxes.module.css";
import Paragraphs from "../../CSS/Paragraphs.module.css";
import { useState } from "react";
import { saveEvent } from "../../API-Funcs/API";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { IUser, IYelpRestaurant } from "../Interfaces/Interfaces";
import { extractRestaurantInfo } from "../../Utils/Utils";

interface Props {
    restaurantShortlist: IYelpRestaurant[];
    setRestaurantShortlist : any;
    setReviewingShortlist : (val: boolean) => void;
    setEventConfirmed : (val: boolean) => void;
    loggedInUser : IUser;
    eventName: string;
    setEventName: (val: string) => void;
}
const RestaurantFinalList = (props: Props) => {
    type ClickEvent = React.MouseEvent<HTMLButtonElement>;
    type SubmitEvent = React.FormEvent<HTMLFormElement>;
    type InputEvent = React.ChangeEvent<HTMLInputElement>;

    const [eventClosingDate, setEventClosingDate] = useState('2021-09-28T19:08:04.963Z');
    const [eventNameInput, setEventNameInput] = useState('');
    const [nameChosen, setNameChosen] = useState(false); //used to toggle between name input form and displaying the chosen name
 
    

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        props.setEventName(eventNameInput);
        setNameChosen(true);
      };

      const handleChange = (e: InputEvent) => {
        setEventNameInput(e.target.value);
      };

      const handleConfirmSelection = (e: ClickEvent) => {
            e.preventDefault();
            
            if(props.eventName.length >= 3 && props.restaurantShortlist.length > 1) {
               
                const restaurantList = extractRestaurantInfo(props.restaurantShortlist); //turns the shortlist into a proper object to enter into database
                saveEvent({
                    eventName : props.eventName,
                    organiser : props.loggedInUser.name,
                    endDate : eventClosingDate,
                    restaurantList : restaurantList,
                }).then(() => {
                    props.setReviewingShortlist(false);     
                    props.setEventConfirmed(true);
                }).catch((e) => {
                    console.log(e);
                })
            } else {
                //do proper error message later
                alert('Event name must be longer than 2 chars and have at least 2 restaurants in shortlist')
            }
        
      }
    return (
        <section>
          
            <p className={Paragraphs["summary-header"]}>Shortlist</p>

            {/* //enter name or display chosen name // */}
            { !nameChosen ? <>
            <label htmlFor="eventName">Please choose a name for your event</label>
            <form onSubmit={handleSubmit}>
                <input value={eventNameInput} onChange={handleChange} type="text" placeholder="Enter Event Name"></input>
                <input type="submit" value="Set name..." />

            </form> </>
            : <>
            <p className={Paragraphs["summary-event-name"]}>{props.eventName}</p>
            <button onClick={() => setNameChosen(false)}>Edit Name</button>
            </>
            }


            {/* //display the short list// */}
            { props.restaurantShortlist.map((restaurant: any) => {
                return (
                    <div key={restaurant.id} className={Boxes["shortlisted-restaurant-container"]}>
                        <p className={Paragraphs["shortlisted-restaurant-info"]}>
                            {restaurant.name} - {restaurant.rating}
                        </p>
                        <p  onClick={() => {
                            props.setRestaurantShortlist((currShortlist: any) => {
                                const newShortList = [...currShortlist];
                                const index = newShortList.findIndex((rest: any) => rest.id === restaurant.id);
                                newShortList.splice(index, 1);
                                return newShortList;
                            })
                        }} className={Paragraphs["delete-icon"]}><i className="fas fa-trash"></i></p>
                    </div>
                )
            })}
            <form>
            <Datetime />;
            </form>
            <div>
                <button onClick={() => props.setReviewingShortlist(false)}>Add more restaurants</button>
                <button onClick={handleConfirmSelection}>Confirm selection</button>   
            </div>
        </section>
    );
};

export default RestaurantFinalList;