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
    nameChosen: boolean
    setNameChosen: (val: boolean) => void;
}
const RestaurantFinalList = (props: Props) => {
    type ClickEvent = React.MouseEvent<HTMLButtonElement>;
    type SubmitEvent = React.FormEvent<HTMLFormElement>;
    type InputEvent = React.ChangeEvent<HTMLInputElement>;

    const [eventClosingDate, setEventClosingDate] = useState('2021-09-28T19:08:04.963Z');
    const [eventNameInput, setEventNameInput] = useState('');
    // const [nameChosen, setNameChosen] = useState(false); //used to toggle between name input form and displaying the chosen name
 
    

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        props.setEventName(eventNameInput);
        props.setNameChosen(true);
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
          
            <p className={'has-text-weight-bold has-text-link-dark is-size-3'}>Summary</p>

            {/* //enter name or display chosen name // */}
            { !props.nameChosen ? <>
            <label htmlFor="eventName">Please choose a name for your event</label>
            <form onSubmit={handleSubmit}>
                <input value={eventNameInput} className="input is-primary" onChange={handleChange} type="text" placeholder="Enter Event Name"></input>
                <input type="submit" value="Set name..." className="button is-primary" />

            </form> </>
            : <>
            <p className={'has-text-weight-bold has-text-link-dark is-size-3'}>{props.eventName}</p>
            <button className="button is-primary" onClick={() => props.setNameChosen(false)}>Edit Name</button>
            </>
            }


            {/* //display the short list// */}
            { props.restaurantShortlist.map((restaurant: any) => {
                return (
                    <div key={restaurant.id} className="card px-1 my-2 mx-2">
                        <div className="card-content">
                        <span className="is-size-6">
                            {restaurant.name} - 
                        </span>
                        <span className="has-text-warning-dark">
                        {restaurant.rating}
                        </span>
                        <span  onClick={() => {
                            props.setRestaurantShortlist((currShortlist: any) => {
                                const newShortList = [...currShortlist];
                                const index = newShortList.findIndex((rest: any) => rest.id === restaurant.id);
                                newShortList.splice(index, 1);
                                return newShortList;
                            })
                        }} className={Paragraphs["delete-icon"]}><i className="fas fa-trash"></i></span>
                        </div>
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