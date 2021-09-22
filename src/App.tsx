import Header from "./Components/Header"
import "./CSS/App.css"
import 'bulma/css/bulma.min.css'
import { Route, Switch } from "react-router-dom";
import WelcomePage from "./Components/WelcomePage";
import SignUpPage from "./Components/SignUpPage"
import LoginPage from "./Components/LoginPage"
import VoterLandingPage from "./Components/VoterJourney/VoterLandingPage";
import NotFound from "./Components/NotFound"
import { useState } from "react";
import { IUser } from "./Components/Interfaces/Interfaces"
import OrganiserLandingPage from "./Components/OrganiserJourney/OrganiserLandingPage";

function App() {


  const [loggedInUser, setLoggedInUser] = useState<IUser>({ name : 'SWAMmer', status : 'registered'});

  return (
    <div  className="App hero has-background-white">
      <div className="container">
      <Header />
      <Switch>
      <Route exact path="/"> 
        <WelcomePage loggedInUser={loggedInUser} />
      </Route>
      <Route exact path="/dashboard">
        <OrganiserLandingPage loggedInUser={loggedInUser} />
      </Route>
      <Route exact path="/event/:eventName">
        <VoterLandingPage />
      </Route>
      <Route exact path="/Signup-page">
        <SignUpPage/>
      </Route>
      <Route exact path="/Login-Page">
        <LoginPage/>
      </Route>
      <Route path ="*">
        <NotFound />
      </Route>
      </Switch>
      </div>
    </div>
  );
}

export default App;
