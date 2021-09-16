import React from 'react';
import "../CSS/UserEndVotePath.css"

const UserEndVotePath = () => {
    return (
        <section className="UserEndVotePath">
            <h1>Event Name</h1>
            <p>Thank you for voting!</p>
            <p> Voting closes at this time!</p>

            <div>
            <button>Create Your Own Event</button>
            <p>OR</p>
            <button>Your Account</button>
            </div>
        </section>
    );
};

export default UserEndVotePath;