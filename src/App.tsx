import Header from "./Components/Header"
import "./CSS/App.css"
import { Route, Switch } from "react-router-dom";
import WelcomePage from "./Components/WelcomePage";
import SignUpPage from "./Components/SignUpPage"
import LoginPage from "./Components/LoginPage"
import OrganiserDashboard from "./Components/OrganiserDashboard";
import RestaurantList from "./Components/RestaurantList";
import RestaurantFinalList from "./Components/RestaurantFinalList";
import SharableLink from "./Components/SharableLink";
import UserVote from "./Components/UserVote";
import UserEndVotePath from "./Components/UserEndVotePath";
import Results from "./Components/Results";
import { useState } from "react";

function App() {

  //at some point need to allow this to be null as an option
  interface IUser {
    name : string;
    status : 'registered' | 'guest';
  }
  
  //at some point need to allow this to be null as an option
  const [loggedInUser, setLoggedInUser] = useState<IUser>({ name : 'SWAMmer', status : 'registered'});
  return (
    <div className="App">
      <Header />
      <Switch>
      <Route exact path="/"> 
        <WelcomePage loggedInUser={loggedInUser} />
      </Route>
      <Route exact path="/Signup-page">
        <SignUpPage/>
      </Route>
      <Route exact path="/Login-Page">
        <LoginPage/>
      </Route>
      <Route exact path ="/Dashboard">
          <OrganiserDashboard loggedInUser={loggedInUser}/>
      </Route>
      <Route exact path ="/Restaurant-list">
          <RestaurantList/>
      </Route>
      <Route exact path ="/Restaurant-summary">
          <RestaurantFinalList/>
      </Route>
      <Route exact path ="/Sharable-Link">
          <SharableLink/>
      </Route>
      <Route exact path ="/UserVote">
          <UserVote/>
      </Route>
      <Route exact path ="/UserEndVote">
          <UserEndVotePath/>
      </Route>
      <Route exact path ="/EventResultLandingPage">
        <Results/>
      </Route>
      </Switch>
    </div>
  );
}

export default App;
