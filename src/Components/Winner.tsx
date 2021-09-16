import React from 'react';
import "../CSS/Winner.css"
const Winner = () => {
    return (
        <section>
            <h2>Winner</h2>
                <div className="card__main">
                    <img src="" alt="" />
                    <div>
                    <p><strong>Restaurant Name</strong></p>
                    <p>14</p>
                    <p>Cuisine</p>
                    <p>£</p>
                    </div>
                    <button>view results</button>
                </div>
                <div className="RestaurantFinalCard">
                    <ul>
                        <ol>
                            <p><strong>Restaurant Name</strong></p>
                            <span className="upvoted">14</span>
                            <span className="downvoted">5</span>
                        </ol>
                        <ol>
                            <p><strong>Restaurant Name</strong></p>
                            <span className="upvoted">13</span>
                            <span className="downvoted">5</span>
                        </ol>
                        <ol>
                            <p><strong>Restaurant Name</strong></p>
                            <span className="upvoted">10</span>
                            <span className="downvoted">5</span>
                        </ol>
                        <ol>
                            <p><strong>Restaurant Name</strong></p>
                            <span className="upvoted">14</span>
                            <span className="downvoted">5</span>
                        </ol>
                        <ol>
                            <p><strong>Restaurant Name</strong></p>
                            <span className="upvoted">14</span>
                            <span className="downvoted">5</span>
                        </ol>



                    </ul>
                </div>
        </section>
    );
};

export default Winner;