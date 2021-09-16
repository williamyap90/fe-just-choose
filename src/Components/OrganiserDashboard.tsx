import { useState } from "react";
import { getRestaurants } from "../API-Funcs/API";
import "../CSS/UserForm.css"

  interface IUser {
    name: string;
    status: "registered" | "guest";
  }
  interface Props {
    loggedInUser: IUser;
  }
const OrganiserDashboard = (props: Props) => {

    type SubmitEvent = React.FormEvent<HTMLFormElement>;
    const [restaurantSelection, setRestaurantSelection] = useState([]);
    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        getRestaurants({})
            .then((response) => {
                setRestaurantSelection(response);
            }).catch((e: any) => {
                console.log('oops error')
            })
        
    }
    return (
        <section className="UserForm">
            <h1>Welcome {props.loggedInUser.name}</h1>
            <form onSubmit={handleSubmit}>
                
              <label htmlFor="Location">Enter the postcode of where you wish to eat</label>
              <input type="text" name="Location" id="Location" />
              <label htmlFor ="Distance"> Choose a radius </label> 
              <select name="Distance" id="Distance">
                  <option value="1000"> 1km</option>
                  <option value="2000"> 2km</option>
                  <option value="3000"> 3km</option>
                  <option value="4000"> 4km</option>
                  <option value="5000"> 5km</option>
                  <option value="10000"> 10km</option>
                  <option value="20000"> 20km</option>
              </select>

              <label htmlFor ="price">Price range</label> 
              <select name="price" id="price">
                  <option value="1">$</option>
                  <option value="2">$$</option>
                  <option value="3">$$$</option>
                  <option value="4">$$$$</option>
              </select>

              <label htmlFor ="category">Category</label> 
              <select name="category" id="category">
                  <option value="afghani">Afghani</option>
                  <option value="beergardens">beer garden</option>
                  <option value="burgers">burgers</option>
                  <option value="4">$$$$</option>
              </select>

              <input type="submit" value="Sign Up"/>
            </form>
            
        </section>
    );
};

export default OrganiserDashboard;