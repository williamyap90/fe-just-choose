import UserProfile from './UserProfile';
import { IUser } from './Interfaces/Interfaces';

interface Props {
    loggedInUser: IUser | null;
    setLoggedInUser: (val: IUser) => void;
    loggedUserAvatar: string;
}

const Header = (props: Props) => {
    return (
        <div className="header-container">
            <div className="header-user-profile">
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
