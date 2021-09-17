import { useEffect, useState } from "react";
import { getRestaurants } from "../API-Funcs/API";
import "../CSS/UserForm.css";
import Boxes from "../CSS/Boxes.module.css";
import Paragraphs from "../CSS/Paragraphs.module.css";
import Images from "../CSS/Images.module.css";
import Forms from "../CSS/Forms.module.css";
import Loading from "./Loading";
import Pagination from "./SubComponents/Pagination";


interface IUser {
  name: string;
  status: "registered" | "guest";
}
interface Props {
  loggedInUser: IUser;
}
interface IFilters {
  location: string;
  radius: null | string;
  limit: null | number;
  sort_by: null | string;
  price: null | string;
  offset: number;
}

interface IRestaurant {}

const OrganiserDashboard = (props: Props) => {
  type SubmitEvent = React.FormEvent<HTMLFormElement>;
  type SelectEvent = React.ChangeEvent<HTMLSelectElement>;
  type InputEvent = React.ChangeEvent<HTMLInputElement>;
  type ClickEvent = React.MouseEvent<HTMLElement>;
  const [restaurantSelection, setRestaurantSelection] = useState([]);
  const [restaurantShortlist, setRestaurantShortlist] = useState([]);
  const [totalNumberOfResults, setTotalNumberOfResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<IFilters>({
    location: "",
    radius: null,
    limit: 10,
    sort_by: null,
    price: null,
    offset: 0,
  });


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
      console.log('hiii');
    getRestaurantsFromYelp();
  }, [filters.offset])

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    getRestaurantsFromYelp();

  };
  const handleChange = (e: SelectEvent | InputEvent) => {
    console.log(e.target.id);
    setFilters((currFilters) => {
      const newFilters = { ...currFilters };
      switch (e.target.id) {
        case "Distance":
          newFilters.radius = e.target.value;
          break;
        case "price":
          newFilters.price = e.target.value;
          break;
        case "sort_by":
          newFilters.sort_by = e.target.value;
          break;
        case "location":
          newFilters.location = e.target.value;
          break;
      }
      return newFilters;
    });
  };


  return (
    <>
    <section className={Boxes["shortlist-filters-container"]}>
        
      <h1 className={Paragraphs["welcome-text"]}>Welcome {props.loggedInUser.name}</h1>
      <form className={Forms["filters-form"]} onSubmit={handleSubmit}>
        <label htmlFor="Location">
          <p className={Paragraphs["form-label-paragraph"]}> Enter the postcode or name of the area where you wish to eat </p>
        </label>
        <input
          type="text"
          name="Location"
          id="location"
          value={filters.location}
          onChange={handleChange}
          className={Forms["filters-form-element"]}
        />
        <label htmlFor="Distance"> 
        <p className={Paragraphs["form-label-paragraph"]}> Choose a radius </p>
        </label>
        <select className={Forms["filters-form-element"]} onChange={handleChange} name="Distance" id="Distance">
          <option value="1000"> 1km</option>
          <option value="2000"> 2km</option>
          <option value="3000"> 3km</option>
          <option value="4000"> 4km</option>
          <option value="5000"> 5km</option>
          <option value="10000"> 10km</option>
          <option value="20000"> 20km</option>
        </select>

        <label htmlFor="price">
        <p className={Paragraphs["form-label-paragraph"]}> Price range</p>
        </label>
        <select className={Forms["filters-form-element"]} onChange={handleChange} name="price" id="price">
          <option value="1">$</option>
          <option value="2">$$</option>
          <option value="3">$$$</option>
          <option value="4">$$$$</option>
        </select>

        {/* <label htmlFor ="category">Category</label> 
              <select name="category" id="category">
                  <option value="afghani">Afghani</option>
                  <option value="beergardens">beer garden</option>
                  <option value="burgers">burgers</option>
                  <option value="4">$$$$</option>
              </select> */}

        <label htmlFor="sort_by">
        <p className={Paragraphs["form-label-paragraph"]}> Sort By</p>
        </label>
        <select className={Forms["filters-form-element"]} onChange={handleChange} name="sort_by" id="sort_by">
          <option value="distance">Distance</option>
          <option value="rating">Rating</option>
          <option value="review_count">Review Count</option>
        </select>

        <input className={Forms["filters-form-element"]} type="submit" value="Find Restaurants" />
      </form>
      </section>


        <section className={Boxes["shortlist-info-presubmission-container"]}>
      <p className={Paragraphs["shortlist-info"]}>
          Restaurants shortlisted: {restaurantShortlist.length}
          </p>
          <form className={Forms["shortlist-submission"]}>
              <input className={Forms["shortlist-submission-button"]} type="submit" value="Review List" />
          </form>
          <p className={Paragraphs["shortlist-info"]}>
              Select restaurants from the selection to add to your shortlist
          </p>
        </section>

      
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
    
     <section className={Boxes["shortlist-info-presubmission-container"]}>
      <p className={Paragraphs["shortlist-info"]}>
          Restaurants shortlisted: {restaurantShortlist.length}
          </p>
          <form className={Forms["shortlist-submission"]}>
              <input className={Forms["shortlist-submission-button"]} type="submit" value="Review List" />
          </form>
          <p className={Paragraphs["shortlist-info"]}>
              Select restaurants from the selection to add to your shortlist
          </p>
        </section> </>
}
   </>
  );
};

export default OrganiserDashboard;
