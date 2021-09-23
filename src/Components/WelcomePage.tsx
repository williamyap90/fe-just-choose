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
                    Create an event, send it to your friends, let them do the
                    hard work for you.
                </p>
            </div>

            {/* checks to see if user is logged in or not. Displays login buttons vs dashboard options accordingly */}
            {props.loggedInUser ? (
                <div className="welcome-intro--user-loggedin">
                    <Link to="/Dashboard">
                        <button className="primary-button">Create Event</button>
                    </Link>
                    <Link to="/profile-page">
                        <button className="secondary-button">
                            View Profile
                        </button>
                    </Link>
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
