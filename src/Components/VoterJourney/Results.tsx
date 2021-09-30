import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventById } from '../../API-Funcs/API';
import Loading from '../OrganiserJourney/SubComponents/Loading';
import Boxes from '../../CSS/Boxes.module.css';
import Images from '../../CSS/Images.module.css';
import Paragraphs from '../../CSS/Paragraphs.module.css';
import { IEvent, ISavedRestaurant } from '../Interfaces/Interfaces';
import WaitForResults from './WaitForResults';

const Results = () => {
    const { eventName } = useParams<any>();
    const [isLoading, setIsLoading] = useState(true);
    const [showingFullResults, setShowingFullResults] = useState(false); //used to render the additional results rather than just the winner
    const [event, setEvent] = useState<IEvent>();

    useEffect(() => {
        setIsLoading(true);
        fetchEventById(eventName)
            .then((response: any) => {
                setEvent(() => {
                    response.event[0].restaurantList.sort(
                        (a: ISavedRestaurant, b: ISavedRestaurant) => {
                            //sorts restaurantlist into rating order
                            return b.upvotes - a.upvotes;
                        }
                    );
                    return response.event[0];
                });
                setIsLoading(false);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    if (isLoading) return <Loading />;

    // conditional rendering checking enddate has passed or not
    let currTime = new Date();
    let endTime;
    if (event) {
        endTime = new Date(event.endDate);

        if (endTime > currTime) {
            return <WaitForResults />;
        }
    }
    const createStars = (rating: number) => {
        const fullStars = Math.floor(rating / 1);
        const halfStars = rating % 1;

        const fullStarIcon = <i className="fas fa-star"></i>;
        const halfStarIcon = <i className="fas fa-star-half-alt"></i>;
        const emptyStarIcon = <i className="far fa-star"></i>;

        let stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(fullStarIcon);
        }

        if (halfStars === 0.5) stars.push(halfStarIcon);
        while (stars.length < 5) stars.push(emptyStarIcon);

        return (
            <div className="rating-star-container">
                {stars.map((star) => {
                    return star;
                })}
            </div>
        );
    };

    //else return the results as per below
    return (
        <section className="Results">
            <h1 className="page-header-results">{event && event.eventName}</h1>
            <h2>Voting has ended</h2>

            <p>The winner is:</p>
            <div className={Boxes['winning-restaurant-display-container']}>
                <p className="winner-title">
                    - {event && event.restaurantList[0].restaurantName} -
                </p>

                <p className="winner-category">
                    {event &&
                        event.restaurantList[0].categories.map(
                            (category: string) => {
                                return `${category} `;
                            }
                        )}
                </p>

                <img
                    className={Images['restaurant-info-picture']}
                    src={event && event.restaurantList[0].imageUrl}
                ></img>
                <a href={event && event.restaurantList[0].url}>
                    Restaurant Link
                </a>
                <p>{event && createStars(event.restaurantList[0].rating)}</p>
                <p>Total votes: {event && event.restaurantList[0].upvotes}</p>
            </div>

            <div>
                <button
                    className="secondary-button-results"
                    onClick={() => {
                        setShowingFullResults(
                            (showingFullResults) => !showingFullResults
                        );
                    }}
                >
                    View the full results...
                </button>
            </div>

            {showingFullResults &&
                event &&
                event.restaurantList.map(
                    (restaurant: ISavedRestaurant, index: number) => {
                        return (
                            index !== 0 && (
                                <div
                                    key={restaurant._id}
                                    className={
                                        Boxes['restaurant-info-container']
                                    }
                                >
                                    <p
                                        className={
                                            Paragraphs['restaurant-info-title']
                                        }
                                    >
                                        {restaurant.restaurantName}{' '}
                                    </p>
                                    <p
                                        className={
                                            Paragraphs[
                                                'restaurant-info-subtitle'
                                            ]
                                        }
                                    >
                                        {restaurant.categories.map(
                                            (
                                                category: string,
                                                index: number
                                            ) => {
                                                return (
                                                    index < 5 &&
                                                    category + ' . '
                                                );
                                            }
                                        )}
                                    </p>

                                    <img
                                        className={
                                            Images['restaurant-info-picture']
                                        }
                                        src={restaurant.imageUrl}
                                    ></img>
                                    <p
                                        className={
                                            Paragraphs[
                                                'restaurant-info-additional'
                                            ]
                                        }
                                    >
                                        {createStars(restaurant.rating)}
                                    </p>
                                    <p
                                        className={
                                            Paragraphs[
                                                'restaurant-info-additional'
                                            ]
                                        }
                                    >
                                        <a href={restaurant.url}>Website</a>
                                    </p>
                                    <p>Total votes: {restaurant.upvotes}</p>
                                </div>
                            )
                        );
                    }
                )}
            <a href="#App" className="results-top">
                Back to top
            </a>
        </section>
    );
};

export default Results;
