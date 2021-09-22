import UserProfile from './UserProfile';
import { IUser } from './Interfaces/Interfaces';

interface Props {
    loggedInUser: IUser | null;
    setLoggedInUser: (val: IUser) => void;
    loggedUserAvatar: string;
}

const Header = (props: Props) => {
    return (
        <div className="HeaderContainer">
            <div className="Header">
                <h3>Welcome to</h3>
                <h1 className="HeaderTitle">Just Choose</h1>
            </div>

            <div className="UserProfile">
                <UserProfile
                    loggedInUser={props.loggedInUser}
                    setLoggedInUser={props.setLoggedInUser}
                    loggedUserAvatar={props.loggedUserAvatar}
                />
            </div>
        </div>
    );
};

export default Header;
