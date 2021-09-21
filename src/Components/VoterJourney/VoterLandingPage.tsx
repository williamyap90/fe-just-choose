import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEventById, patchVotesByEventName } from "../../API-Funcs/API";
import Loading from "../OrganiserJourney/SubComponents/Loading";
import Boxes from "../../CSS/Boxes.module.css";
import Images from "../../CSS/Images.module.css";
import Paragraphs from "../../CSS/Paragraphs.module.css";
import HasVoted from "./HasVoted";
import Results from "./Results";
import { IEvent, ISavedRestaurant, IVotes } from "../Interfaces/Interfaces";




export default function VoterLandingPage() {

const { eventName } = useParams<any>();
const [isLoading, setIsLoading] = useState(true);
const [event, setEvent] = useState<IEvent | null>(null);
const [hasVoted, setHasVoted] = useState(false); //need to do some cookies stuff to set hasVoted or not depending on cookies. 
const [votes, setVotes] = useState<IVotes[] | []>([]); //an array of 'vote objects'. Object includes restaurant name, id and vote type.
const [displayRestaurant, setDisplayRestaurant] = useState<ISavedRestaurant>() //displayrestaurant is the restaurant currently being voted on (ie on display)


useEffect(() => {
    setIsLoading(true);
    fetchEventById(eventName) 
    .then((response: any) => {
        console.log(response.event)
        setEvent(response.event[0])
        setDisplayRestaurant(response.event[0].restaurantList[0]);
        setIsLoading(false);
    })
    .catch((e) => {
        console.log(e);
    })
}, [])

useEffect(() => { //when 'votes' changes this effect replaces the 'displayRestaurant' with another from the event restaurant list. It picks one that hasnt been voted on yet (obviously)
    if(!isLoading && event) { //loading check is required so the useeffect isnt triggered on initial render (which is when votes is set for the first time)
        const newDisplay = event.restaurantList.find((restaurant: any) => {
            return votes.every((voteObj: any) => {
                return voteObj.restaurantID !== restaurant._id;
                
            })
        })
        if(newDisplay) {
            setDisplayRestaurant(newDisplay);
        } else {
            //no restaurants left to vote on so patch the database with the votes and trigger the next conditional render
            patchVotesByEventName(votes, event.eventName)
            .then(() => {
                //here is where we need to update local storage/cookies to tell it this user has already voted
                //then hasvoted can be set to true next time they visit the page
                setHasVoted(true);
            })

        }
    }
}, [votes])


//adds the latest vote to the vote state. This then triggers the useffect which updates the next displayrestaurant state
const handleClick = (voteType: any, id: any, restaurantName: any) => {
    setVotes((currVotes: any) => {
        const newVotes = currVotes.map((vote:any) => { return {...vote}})
        const voteObj:any = {}
        voteObj.restaurantID = id;
        voteObj.voteType = voteType;
        voteObj.restaurantName = restaurantName;
        newVotes.push(voteObj);
        return newVotes;
    })
}

if(isLoading)
    return <Loading />

//this needs to be hasVoted OR deadline has passed.
if(hasVoted)
    return <Results />


//else the voting page.... :
return (
    <div>
        <p>You have been invited to vote at {event && event.eventName}</p>
        <p>Swipe right to vote yes, swipe left to vote no</p>
        <p>Voting will end at {event && event.endDate}</p>

        {/* //render the restaurant currently stored in displayRestaurant */}
        <div className={Boxes['voting-restaurant-display-container']}>
            <p>{displayRestaurant && displayRestaurant.restaurantName}</p>
            <p>
                {displayRestaurant && displayRestaurant.categories.map((category: string) => {
                return `- ${category} - `;
            })}
            </p>

            <img className={Images['restaurant-info-picture']} src={displayRestaurant && displayRestaurant.imageUrl}></img>
            <a href={displayRestaurant && displayRestaurant.url}>Restaurant Link</a>
            <p>Rating: {displayRestaurant && displayRestaurant.rating}</p>
            <div className={Boxes['vote-yes-or-no-container']}>
                    <button onClick={() => {
                        handleClick('down', displayRestaurant && displayRestaurant._id, displayRestaurant && displayRestaurant.restaurantName)
                    }}         
                        
                    > <p className={Paragraphs['vote-yes-or-no-icons']}> 
                        <i className="fas fa-times"></i>
                        </p>
                    </button>
                    <button onClick={() => {
                        handleClick('up', displayRestaurant && displayRestaurant._id, displayRestaurant && displayRestaurant.restaurantName)
                    }}         
                    >
                    <p className={Paragraphs['vote-yes-or-no-icons']}> 
                        <i className="fas fa-check"></i>
                        </p>
                    </button>
            </div>

        </div>
               
    </div> 
)
}


