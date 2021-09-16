import React from 'react';
import "../CSS/RestaurantFinalList.css"

const RestaurantFinalList = () => {
    return (
        <section>
            <h2>Summary</h2>
            <input type="text" placeholder="Enter Event Name"></input>
            <div className="RestaurantFinalCard">
                <ul>
                    <li>
                    <p><strong>Restaurant Name</strong></p>
                    <p>Rating</p>
                    <button>X</button>
                    </li>
                    <li>
                    <p><strong>Restaurant Name</strong></p>
                    <p>Rating</p>
                    <button>X</button>
                    </li>
                    <li>
                    <p><strong>Restaurant Name</strong></p>
                    <p>Rating</p>
                    <button>X</button>
                    </li>
                    <li>
                    <p><strong>Restaurant Name</strong></p>
                    <p>Rating</p>
                    <button>X</button>
                    </li>
                    <li>
                    <p><strong>Restaurant Name</strong></p>
                    <p>Rating</p>
                    <button>X</button>
                    </li>



                </ul>
            </div>
            <div className="Buttons">
                <button>Edit List</button>
                <button>Confirm</button>   
            </div>
        </section>
    );
};

export default RestaurantFinalList;