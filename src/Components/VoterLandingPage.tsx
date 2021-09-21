import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEvent, fetchEventById, patchVotesByEventName } from "../API-Funcs/API";
import Loading from "./Loading";
import Boxes from "../CSS/Boxes.module.css";
import Images from "../CSS/Images.module.css";
import Paragraphs from "../CSS/Paragraphs.module.css";
import HasVoted from "./SubComponents/HasVoted";
import Results from "./Results";




export default function VoterLandingPage() {
const { eventID } = useParams<any>();
const [isLoading, setIsLoading] = useState(true);
const [event, setEvent] = useState<any>({});

const [hasVoted, setHasVoted] = useState(false); //need to do some cookies stuff to set hasVoted or not depending on cookies. 
const [votes, setVotes] = useState<any>([]);

const [displayRestaurant, setDisplayRestaurant] = useState<any>({})


useEffect(() => {
    setIsLoading(true);
    fetchEventById(eventID)
    // fetchEvent('biglads')
    .then((response: any) => {
        setEvent(response.event[0])
        setDisplayRestaurant(response.event[0].restaurantList[0]);
        setIsLoading(false);
    })
    .catch((e) => {
        console.log(e);
    })
}, [])

useEffect(() => {
    if(!isLoading) {
        const newDisplay = event.restaurantList.find((restaurant: any) => {
            return votes.every((voteObj: any) => {
                return voteObj.restaurantID !== restaurant._id;
                
            })
        })
        //taking restaurns from restaurnlist one by one
        //comparing that resraunt id to ids in the 
        console.log(newDisplay);
        if(newDisplay) {
            setDisplayRestaurant(newDisplay);
        } else {
            console.log('no more restaurants')
            patchVotesByEventName(votes, event.eventName)
            .then(() => {
                setHasVoted(true);

            })
            //post votes to database
            //update local storage/cookies to say user has already voted

        }
    }
}, [votes])


console.log('Display restaurant')
console.log(displayRestaurant)
const handleClick = (voteType: any, id: any, restaurantName: any) => {
    console.log(`ID`)
    console.log(id);
    setVotes((currVotes: any) => {
        const newVotes = currVotes.map((vote:any) => { return {...vote}})
        //newVotes is an array of voteObjects, with restaurantID and voteType properties
        const voteObj:any = {}
        voteObj.restaurantID = id;
        voteObj.voteType = voteType;
        voteObj.restaurantName = restaurantName;
        newVotes.push(voteObj);
        console.log(newVotes)
        return newVotes;
    })
    
}

if(isLoading)
    return <Loading />

//conditional rendering
//if deadline/closedate has passed then

if(hasVoted)
    return <Results />

//if user has voted then
//<HasVoted />
if(hasVoted)
  return <HasVoted event={event}/>
  

//else the voting page.... :
return (
    <div>
        <p>You have been invited to vote at {event.eventName}</p>
        <p>Swipe right to vote yes, swipe left to vote no</p>
        <p>Voting will end at {event.endDate}</p>
        
        {/* {event.restaurantList.map((restaurant:any) => {

                //checks if restaurant exists in the votes list and if not displays it
               if(!votes.some((vote:any) => { return vote.restaurantID === restaurant._id})) {
                   
                   return  (
                        
                         <div className={Boxes['voting-restaurant-display-container']}>
                     <p>{restaurant.restaurantName}</p>
                    
                     <p>
                         {restaurant.categories.map((category: string) => {
                         return `- ${category} - `;
                     })}
                     </p>
         
                     <img className={Images['restaurant-info-picture']} src={restaurant.imageUrl}></img>
                     <a href={restaurant.url}>Restaurant Link</a>
                     <p>Rating: {restaurant.rating}</p>
                     <div className={Boxes['vote-yes-or-no-container']}>
                             <button onClick={() => {
                                 handleClick('down', restaurant._id)
                             }}         
                                 
                             > <p className={Paragraphs['vote-yes-or-no-icons']}> 
                                 <i className="fas fa-times"></i>
                                 </p>
                             </button>
                             <button onClick={() => {
                                 handleClick('up', restaurant._id)
                             }}         
                             >
                             <p className={Paragraphs['vote-yes-or-no-icons']}> 
                                 <i className="fas fa-check"></i>
                                 </p>
                             </button>
                     </div>
         
                 </div>
                     )
               }
         
            
        })} */}


        <div className={Boxes['voting-restaurant-display-container']}>
            <p>{displayRestaurant.restaurantName}</p>
           
            <p>
                {displayRestaurant.categories.map((category: string) => {
                return `- ${category} - `;
            })}
            </p>

            <img className={Images['restaurant-info-picture']} src={displayRestaurant.imageUrl}></img>
            <a href={displayRestaurant.url}>Restaurant Link</a>
            <p>Rating: {displayRestaurant.rating}</p>
            <div className={Boxes['vote-yes-or-no-container']}>
                    <button onClick={() => {
                        handleClick('down', displayRestaurant._id, displayRestaurant.restaurantName)
                    }}         
                        
                    > <p className={Paragraphs['vote-yes-or-no-icons']}> 
                        <i className="fas fa-times"></i>
                        </p>
                    </button>
                    <button onClick={() => {
                        handleClick('up', displayRestaurant._id, displayRestaurant.restaurantName)
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


