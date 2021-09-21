import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEventById } from "../API-Funcs/API";
import Loading from "./Loading";
import Boxes from "../CSS/Boxes.module.css";
import Images from "../CSS/Images.module.css";
import Paragraphs from "../CSS/Paragraphs.module.css";

const Results = () => {
    const { eventID } = useParams<any>();
    const [isLoading, setIsLoading] = useState(true);
    const [showingFullResults, setShowingFullResults] = useState(false);
    const [event, setEvent] = useState<any>();

    useEffect(() => {
        setIsLoading(true);
        fetchEventById(eventID)
        // fetchEvent('biglads')
        .then((response: any) => {
            //set event but sort the restaurantlist array out first 
            setEvent(() => {
                response.event[0].restaurantList.sort((a:any,b:any) => {
                    return b.upvotes - a.upvotes;
                })
                return response.event[0];
            })
            setIsLoading(false);
        })
        .catch((e) => {
            console.log(e);
        })
    }, [])
 
    if(isLoading)
        return <Loading />
    return (
        <section className="Results">
        <h1>{event.eventName}</h1>
        <h2>Voting has ended</h2>

        <p>The winner is:</p>
        <div className={Boxes['winning-restaurant-display-container']}>
            <p>{event.restaurantList[0].restaurantName}</p>
           
            <p>
                {event.restaurantList[0].categories.map((category: string) => {
                return `- ${category} - `;
            })}
            </p>

            <img className={Images['restaurant-info-picture']} src={event.restaurantList[0].imageUrl}></img>
            <a href={event.restaurantList[0].url}>Restaurant Link</a>
            <p>Rating: {event.restaurantList[0].rating}</p>
            <p>Total votes: {event.restaurantList[0].upvotes}</p>
    

        </div>
        

        <div>
        <button onClick={() => { setShowingFullResults(showingFullResults => !showingFullResults)}}>View the full results...</button>
        </div>

        { showingFullResults && event.restaurantList.map((restaurant: any, index : number) => {
           return (
                index !== 0 && <>
                <div key={restaurant._id} className={Boxes["restaurant-info-container"]}>
                  <p className={Paragraphs["restaurant-info-title"]}>
                    {restaurant.restaurantName}{" "}
                  </p>
                  <p className={Paragraphs["restaurant-info-subtitle"]}>
                    {restaurant.categories.map((category: any, index: number) => {
                      return index < 5 && category + " . ";
                    })}
                  </p>    
      
                  <img
                    className={Images["restaurant-info-picture"]}
                    src={restaurant.imageUrl}
                  ></img>
                  <p className={Paragraphs["restaurant-info-additional"]}>
                    Rating - {restaurant.rating}
                  </p>
                  <p className={Paragraphs["restaurant-info-additional"]}>
                    <a href={restaurant.url}>Website</a>
                  </p>
                  <p>Total votes: {restaurant.upvotes}</p>
          
                </div> </> 
              );
        })}
    </section>
    
    );
};

export default Results;