import Header from './Components/Header';
import './CSS/App.css';
import { Route, Switch } from 'react-router-dom';
import WelcomePage from './Components/WelcomePage';
import SignUpPage from './Components/SignUpPage';
import LoginPage from './Components/LoginPage';
import VoterLandingPage from './Components/VoterJourney/VoterLandingPage';
import NotFound from './Components/NotFound';
import { useState, useEffect } from 'react';
import { IUser } from './Components/Interfaces/Interfaces';
import OrganiserLandingPage from './Components/OrganiserJourney/OrganiserLandingPage';
import 'react-datetime/css/react-datetime.css';
import UserProfile from './Components/UserProfile';
import EventHistory from './Components/EventHistory';

function App() {
    const [loggedInUser, setLoggedInUser] = useState<IUser | null>(null);
    const [loggedUserAvatar, setLoggedUserAvatar] = useState('');

    useEffect(() => {
        const hasUsername = localStorage.getItem('username');
        if (hasUsername) {
            setLoggedInUser((currUser: any) => {
                const newCurrUser = { ...currUser };
                newCurrUser.name = hasUsername;
                newCurrUser.status = 'registered';
                return newCurrUser;
            });
        }
    }, []);

    return (
        <div className="App" id="App">
            <Header
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
                loggedUserAvatar={loggedUserAvatar}
            />
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
                <Route exact path="/signup-page">
                    <SignUpPage />
                </Route>
                <Route exact path="/login-page">
                    <LoginPage
                        setLoggedInUser={setLoggedInUser}
                        setLoggedUserAvatar={setLoggedUserAvatar}
                    />
                </Route>
                <Route exact path="/profile-page">
                    <EventHistory loggedInUser={loggedInUser} />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
