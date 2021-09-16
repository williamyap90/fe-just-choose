import React from 'react';
import "../CSS/UserVote.css"

const UserVote = () => {
    return (
        <section className="UserVote">
        {/* FILTER COMPONENT TO GO HERE */}

        <ul>
            <li><img src="" alt=""/>
            <div>

            <p><strong>Restaurant Name</strong></p>
            <p>Rating</p>
            
            <p>Cuisine</p> 
            <p>Average ££</p>   

            

            </div>
            </li>
           
            {/* <li><img src="" alt=""/>
            <div>

            <p><strong>Restaurant Name</strong></p>
            <p>Rating</p>
            
            <p>Cuisine</p> 
            <p>Average ££</p>   

            

            </div>
            </li> */}


        </ul>

    <div className="SwipeButtons">
    <button>No</button>
    <button>Yes</button>   
    </div>
    </section>
    );
};

export default UserVote; 