import Boxes from "../../CSS/Boxes.module.css";
import Paragraphs from "../../CSS/Paragraphs.module.css";
import Images from "../../CSS/Images.module.css";
import Loading from "./SubComponents/Loading"; 
import Pagination from "./SubComponents/Pagination";
import ShortlistSubmission from "./SubComponents/ShortlistSubmission";
import RestaurantFilters from "./SubComponents/RestaurantFilters";
import { useEffect, useState } from "react";
import { IFilters, IUser, IYelpRestaurant } from "../Interfaces/Interfaces";
import { getRestaurants } from "../../API-Funcs/API";


interface Props {
    loggedInUser: IUser;
    restaurantShortlist: IYelpRestaurant[];
    setReviewingShortlist : (val: boolean) => void;
    setRestaurantShortlist : any;
}

export default function RestaurantSelection(props: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [restaurantSelection, setRestaurantSelection] = useState([]); //the list of restaurants from YELP api
    const [totalNumberOfResults, setTotalNumberOfResults] = useState(0); //used for pagination of yelp results

    const [filters, setFilters] = useState<IFilters>({
        location: "",
        radius: '1000',
        limit: 10,
        sort_by: 'distance',
        price: '1',
        offset: 0,
      });

    const getRestaurantsFromYelp = () => {
        if(filters.location.length >= 1) { //yelp throws an error if location is not set as part of the query
            setIsLoading(true);
            getRestaurants(filters)
            .then((response) => {
                setRestaurantSelection(response.restaurants.businesses);
                setTotalNumberOfResults(response.restaurants.total); //pagination
                setIsLoading(false);
            })
            .catch((e: any) => {
                console.log(e);
            });
        }
      }
    useEffect(() => { //get more results if the offset filter changes - pagination.
        getRestaurantsFromYelp();
    }, [filters.offset])


    const handleClick = (restaurant: any) => { //adds restaurant to shortlist
        props.setRestaurantShortlist((currShortList: any) => {
            const newShortList = [...currShortList];
            const currRestIndex = newShortList.findIndex((rest: any) => rest.id === restaurant.id);
            if( currRestIndex >= 0) {
                newShortList.splice(currRestIndex, 1);
            } else newShortList.push(restaurant);
            return newShortList;
        })
    }
    

    //renders filters components and the mini box that shows the current short list selection
    //then when finished loading renders the selection of restaurants from yelp
    return (
        <>
        <RestaurantFilters loggedInUser={props.loggedInUser} filters={filters} setFilters={setFilters} setIsLoading={setIsLoading} setRestaurantSelection={setRestaurantSelection} setTotalNumberOfResults={setTotalNumberOfResults}/>
        <ShortlistSubmission restaurantShortlist={props.restaurantShortlist} setReviewingShortlist={props.setReviewingShortlist}/>
          
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
                <p onClick={() => {handleClick(restaurant)}} className={Paragraphs["thumbs-up"]} style={{color: props.restaurantShortlist.some((rest: any) => rest.id === restaurant.id) ? "green" : "" }} > {props.restaurantShortlist.some((rest: any) => rest.id === restaurant.id) && `Shortlisted(${props.restaurantShortlist.length})`} <i className="far fa-thumbs-up"></i></p>
              </div>
            );
          }
          
          )  : <Loading />
        }
        { totalNumberOfResults > 0 && <>
         <Pagination setFilters={setFilters} totalNumberOfResults={totalNumberOfResults} filters={filters}/>
         <ShortlistSubmission restaurantShortlist={props.restaurantShortlist} setReviewingShortlist={props.setReviewingShortlist} />
          </>
    }
       </>
      );
}
