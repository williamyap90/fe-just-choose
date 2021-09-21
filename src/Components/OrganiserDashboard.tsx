import { useEffect, useState } from "react";
import { getRestaurants } from "../API-Funcs/API";
import "../CSS/UserForm.css";
import Boxes from "../CSS/Boxes.module.css";
import Paragraphs from "../CSS/Paragraphs.module.css";
import Images from "../CSS/Images.module.css";
import Loading from "./Loading";
import Pagination from "./SubComponents/Pagination";
import ShortlistSubmission from "./SubComponents/ShortlistSubmission";
import RestaurantFilters from "./SubComponents/RestaurantFilters";
import { IFilters, IUser } from "../Components/Interfaces/Interfaces";
import RestaurantFinalList from "./RestaurantFinalList";
import EventConfirmation from "./EventConfirmation";

interface Props {
  loggedInUser: IUser;
}

const OrganiserDashboard = (props: Props) => {
  const [eventConfirmed, setEventConfirmed] = useState(false);
  const [reviewingShortlist, setReviewingShortlist] = useState(false);
  const [restaurantSelection, setRestaurantSelection] = useState([]);
  const [restaurantShortlist, setRestaurantShortlist] = useState([]);
  const [totalNumberOfResults, setTotalNumberOfResults] = useState(0);
  const [eventName, setEventName] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<IFilters>({
    location: "",
    radius: null,
    limit: 10,
    sort_by: null,
    price: null,
    offset: 0,
  });

  // const [event, setEvent] = useState({
  //   organiser: props.loggedInUser.name,
  //   restaurantShortlist: [],
  //   name: '',
  //   closingDate : null,
  // })

  const getRestaurantsFromYelp = () => {
    if(filters.location.length >= 1) {
        setIsLoading(true);
        getRestaurants(filters)
        .then((response) => {
            setRestaurantSelection(response.restaurants.businesses);
            setTotalNumberOfResults(response.restaurants.total);
            setIsLoading(false);
        })
        .catch((e: any) => {
            console.log(e);
        });
    }
  }



  useEffect(() => {
    getRestaurantsFromYelp();
  }, [filters.offset])

  if(reviewingShortlist) 
    return <RestaurantFinalList eventName={eventName} setEventName={setEventName} loggedInUser={props.loggedInUser} setEventConfirmed={setEventConfirmed} restaurantShortlist={restaurantShortlist} setRestaurantShortlist={setRestaurantShortlist} setReviewingShortlist={setReviewingShortlist}/>
  if(eventConfirmed)
    return <EventConfirmation eventName={eventName} setEventName={setEventName} />

//if not on shortlist or event confirmation then render the filters and page where you choose the shortlist
  return (
    <>
    
    <RestaurantFilters loggedInUser={props.loggedInUser} filters={filters} setFilters={setFilters} setIsLoading={setIsLoading} setRestaurantSelection={setRestaurantSelection} setTotalNumberOfResults={setTotalNumberOfResults}/>
    <ShortlistSubmission restaurantShortlist={restaurantShortlist} setReviewingShortlist={setReviewingShortlist}/>
      
      { !isLoading ? 
      restaurantSelection.map((restaurant: any) => {
        return (
          <div key={restaurant.id} className={Boxes["restaurant-info-container"]}>
            <p className={Paragraphs["restaurant-info-title"]}>
              {restaurant.name}{" "}
            </p>
            <p className={Paragraphs["restaurant-info-subtitle"]}>
              {restaurant.categories.map((category: any, index: number) => {
                return index < 5 && category.title + " . ";
              })}
            </p>    

            <img
              className={Images["restaurant-info-picture"]}
              src={restaurant.image_url}
            ></img>
            <p className={Paragraphs["restaurant-info-additional"]}>
              Rating - {restaurant.rating}
            </p>
            <p className={Paragraphs["restaurant-info-additional"]}>
              Number of reviews: {restaurant.review_count}{" "}
            </p>
            <p className={Paragraphs["restaurant-info-additional"]}>
              Price category: {restaurant.price}{" "}
            </p>
            <p className={Paragraphs["restaurant-info-additional"]}>
              Distance: {Math.floor(restaurant.distance)}m{" "}
            </p>
            <p className={Paragraphs["restaurant-info-additional"]}>
              {restaurant.location.display_address}{" "}
            </p>
            <p className={Paragraphs["restaurant-info-additional"]}>
              <a href={restaurant.url}>Website</a>{" "}
            </p>
            <p onClick={() => {
                setRestaurantShortlist((currShortList) => {
                    const newShortList: any = [...currShortList];
                    const currRestIndex = newShortList.findIndex((rest: any) => rest.id === restaurant.id);
                    if( currRestIndex >= 0) {
                        newShortList.splice(currRestIndex, 1);
                    } else newShortList.push(restaurant);
                    return newShortList;
                })
            }} className={Paragraphs["thumbs-up"]} style={{color: restaurantShortlist.some((rest: any) => rest.id === restaurant.id) ? "green" : "" }} > {restaurantShortlist.some((rest: any) => rest.id === restaurant.id) && `Shortlisted(${restaurantShortlist.length})`} <i className="far fa-thumbs-up"></i></p>
          </div>
        );
      }
      
      )  : <Loading />
    }
    { totalNumberOfResults > 0 && <>
     <Pagination setFilters={setFilters} totalNumberOfResults={totalNumberOfResults} filters={filters}/>
     <ShortlistSubmission restaurantShortlist={restaurantShortlist} setReviewingShortlist={setReviewingShortlist} />
      </>
}
   </>
  );
};

export default OrganiserDashboard;
