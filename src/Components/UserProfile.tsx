const UserProfile = (props: any) => {
    const handleClick = () => {
        props.setLoggedInUser(null);
    };
    console.log(props.loggedInUser)
    return (
        <div>
            {props.loggedInUser ? (
                <div className="user-container">
                    <div className="user-text">
                        <p>
                            
                            Hello <span>{props.loggedInUser.name}</span>!
                        </p>
                        <div
                            onClick={() => {
                                handleClick();
                            }}
                        >
                            <p className="user-text-signout">Sign out</p>
                        </div>
                    </div>
                    <img
                        className="user-avatar"
                        src={props.loggedUserAvatar}
                        alt={props.loggedInUser.name}
                    />
                </div>
            ) : null}
        </div>
    );
};

export default UserProfile;
