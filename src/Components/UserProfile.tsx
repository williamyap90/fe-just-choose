const UserProfile = (props: any) => {
    const handleClick = () => {
        props.setLoggedInUser(null);
    };

    return (
        <div>
            {props.loggedInUser ? (
                <div>
                    <p>Hello {props.loggedInUser.name}!</p>
                    <div
                        onClick={() => {
                            handleClick();
                        }}
                    >
                        <p>Sign out</p>
                    </div>
                    <img
                        src={props.loggedUserAvatar}
                        alt={props.loggedInUser.name}
                    />
                </div>
            ) : null}
        </div>
    );
};

export default UserProfile;
