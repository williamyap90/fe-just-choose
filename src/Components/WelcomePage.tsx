import React from 'react';
import { Link } from 'react-router-dom';

interface IUser {
    name: string;
    status: 'registered' | 'guest';
}

interface Props {
    loggedInUser: IUser | null;
}

const WelcomePage = (props: Props) => {
    return (
        <section>
            <div className="welcome-intro">
                <p className="welcome-intro--intro">Welcome to</p>
                <h1 className="welcome-intro--header">Just Choose</h1>
                <p className="welcome-intro--text">
                    Brief text about the app will be added here once the
                    inspiration hits to do so but for now this is a placeholder.
                </p>
            </div>

            {/* checks to see if user is logged in or not. Displays login buttons vs dashboard options accordingly */}
            {props.loggedInUser ? (
                <div className="welcome-intro--user-loggedin">
                    <Link to="/Dashboard">
                        <button className="primary-button">Create Event</button>
                    </Link>
                    <button className="secondary-button">View Profile</button>
                </div>
            ) : (
                <div className="welcome-intro--user">
                    <Link to="/login-page">
                        <button className="primary-button">Login</button>
                    </Link>
                    <div className="welcome-intro--divider">
                        <span className="welcome-intro--divider-text">OR</span>
                    </div>

                    <Link to="/signup-page">
                        <button className="secondary-button">Signup</button>
                    </Link>
                </div>
            )}
        </section>
    );
};

export default WelcomePage;
