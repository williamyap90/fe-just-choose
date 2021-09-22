import React from "react";
import { Link } from "react-router-dom";

interface IUser {
  name: string;
  status: "registered" | "guest";
}

interface Props {
  loggedInUser: IUser;
}
const WelcomePage = (props: Props) => {
  return (
    <div className="">
      <div className="HeaderIntro">
        <p className='subtitle'>
          Welcome Intro
          <br />
          Brief text about the app will be added here once the inspiration hits
          to do so but for now this is a placeholder.
        </p>
      </div>

        {/* checks to see if user is logged in or not. Displays login buttons vs dashboard options accordingly */}
      {props.loggedInUser ? (
        <div className="HeaderLoginSetup">
         <Link to="/Dashboard">  <button className="button is-primary is-medium is-fullwidth mb-2">Create Event</button></Link>
          <button className="button is-primary is-medium is-fullwidth">View Profile</button>
        </div>
      ) : (
        <div className="HeaderLoginSetup">
          <p className="HeaderLoginText">------ Login or Signup -------</p>
         <button>Login</button> 
          <button>Signup</button>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
