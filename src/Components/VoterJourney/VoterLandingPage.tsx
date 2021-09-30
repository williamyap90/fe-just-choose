import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventById, patchVotesByEventName } from '../../API-Funcs/API';
import Loading from '../OrganiserJourney/SubComponents/Loading';
import Boxes from '../../CSS/Boxes.module.css';
import Images from '../../CSS/Images.module.css';
import Paragraphs from '../../CSS/Paragraphs.module.css';
import Results from './Results';
import { ISavedRestaurant, IVotes } from '../Interfaces/Interfaces';
import TinderCard from 'react-tinder-card';

export default function VoterLandingPage() {
    const { eventName } = useParams<any>();
    const [numOfRestaurants, setNumOfRestaurants] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [event, setEvent] = useState<any>({});
    const [hasVoted, setHasVoted] = useState(false); //need to do some cookies stuff to set hasVoted or not depending on cookies.
    const [votes, setVotes] = useState<IVotes[] | []>([]); //an array of 'vote objects'. Object includes restaurant name, id and vote type.

    useEffect(() => {
        if (localStorage.getItem(`hasVoted${eventName}`) === 'true') {
            setHasVoted(true);
        }
        setIsLoading(true);
        fetchEventById(eventName)
            .then((response: any) => {
                setEvent(response.event[0]);
                setNumOfRestaurants(response.event[0].restaurantList.length);
                setIsLoading(false);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    useEffect(() => {
        //when 'votes' changes this effect replaces the 'displayRestaurant' with another from the event restaurant list. It picks one that hasnt been voted on yet (obviously)
        if (!isLoading) {
            if (votes.length === numOfRestaurants) {
                patchVotesByEventName(votes, event.eventName).then(() => {
                    //here is where we need to update local storage/cookies to tell it this user has already voted
                    localStorage.setItem(`hasVoted${event.eventName}`, 'true');
                    //then hasvoted can be set to true next time they visit the page
                    setHasVoted(true);
                });
            }
        }
    }, [votes]);

    const updateVotes = (voteType: any, id: any, restaurantName: any) => {
        voteType = voteType === 'left' || voteType === 'down' ? 'down' : 'up';
        setVotes((currVotes: any) => {
            const newVotes = currVotes.map((vote: any) => {
                return { ...vote };
            });
            const voteObj: any = {};
            voteObj.restaurantID = id;
            voteObj.voteType = voteType;
            voteObj.restaurantName = restaurantName;
            newVotes.push(voteObj);
            return newVotes;
        });
    };

    //adds the latest vote to the vote state. This then triggers the useffect which updates the next displayrestaurant state
    const handleClick = (voteType: any, id: any, restaurantName: any) => {
        updateVotes(voteType, id, restaurantName);
        setEvent((currEvent: any) => {
            const newEvent = { ...currEvent };
            const newRestaurantList = [...currEvent.restaurantList];
            delete newEvent.restaurantList;
            //find restaurant id in restaurant list
            //splice it out
            let restaurantToRemoveIndex = newRestaurantList.findIndex(
                (rest) => rest.restaurantID === id
            );
            newRestaurantList.splice(restaurantToRemoveIndex, 1);
            newEvent.restaurantList = [...newRestaurantList];
            return newEvent;
        });
    };

    const swiped = (
        direction: any,
        restaurantid: string | undefined,
        restaurantName: string | undefined
    ) => {
        updateVotes(direction, restaurantid, restaurantName);
        //remove from restaurantlist in event
        setEvent((currEvent: any) => {
            const newEvent = { ...currEvent };
            const newRestaurantList = [...currEvent.restaurantList];
            delete newEvent.restaurantList;
            //find restaurant id in restaurant list
            //splice it out
            let restaurantToRemoveIndex = newRestaurantList.findIndex(
                (rest) => rest.restaurantID === restaurantid
            );
            newRestaurantList.splice(restaurantToRemoveIndex, 1);
            newEvent.restaurantList = [...newRestaurantList];
            return newEvent;
        });
        // }
    };

    if (isLoading) return <Loading />;

    let currTime = new Date();
    let endTime;
    if (event) {
        endTime = new Date(event.endDate);
        if (endTime < currTime) {
            return <Results />;
        }
    }
    if (hasVoted) return <Results />;

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
    const fixDate = (date: any) => {
        const fixedDate = new Date(date);

        return fixedDate.toString().split(' GMT')[0].slice(0, -3);
    };
    //else the voting page.... :
    return (
        <div>
            <h2 className="page-header-voting">
                You have been invited to vote at{' '}
                <span>{event && event.eventName}</span>
            </h2>
            <div className="voting-page-text">
                <p>Swipe right to vote yes, swipe left to vote no</p>
                <p>Voting will end at {event && fixDate(event.endDate)}</p>
            </div>
            <div className={Boxes['voting-restaurant-display-container']}>
                {event?.restaurantList.map((restaurant: any) => {
                    return (
                        <div className={Boxes['tindercard-container']}>
                            <TinderCard
                                onSwipe={(dir: any) =>
                                    swiped(
                                        dir,
                                        restaurant?._id,
                                        restaurant?.restaurantName
                                    )
                                }
                                preventSwipe={['right', 'left']}
                            >
                                <div className={Boxes['card']}>
                                    <p className="voting-card-title">
                                        {restaurant &&
                                            restaurant.restaurantName}
                                    </p>
                                    {restaurant.categories.some(
                                        (category: any) =>
                                            category === 'Vegan' ||
                                            category === 'Vegetarian'
                                    ) && (
                                        <p
                                            className={
                                                Paragraphs['veggie-icon']
                                            }
                                        >
                                            <i className="fas fa-leaf"></i>
                                        </p>
                                    )}

                                    <p className="voting-card-category">
                                        {restaurant &&
                                            restaurant.categories.map(
                                                (category: string) => {
                                                    return `- ${category} - `;
                                                }
                                            )}
                                    </p>

                                    <img
                                        className={
                                            Images['restaurant-info-picture']
                                        }
                                        src={restaurant && restaurant.imageUrl}
                                    ></img>
                                    <a href={restaurant && restaurant.url}>
                                        Restaurant Link
                                    </a>
                                    <p className="voting-stars">
                                        {restaurant &&
                                            createStars(restaurant.rating)}
                                    </p>
                                </div>
                            </TinderCard>

                            <div className={Boxes['vote-yes-or-no-container']}>
                                <div
                                    className="yes-no-button"
                                    onClick={() => {
                                        handleClick(
                                            'down',
                                            restaurant._id,
                                            restaurant.restaurantName
                                        );
                                    }}
                                >
                                    <p
                                        className={
                                            Paragraphs[
                                                'vote-yes-or-no-icons-no'
                                            ]
                                        }
                                    >
                                        <i className="far fa-times-circle"></i>
                                    </p>
                                </div>
                                <div
                                    className="yes-no-button"
                                    onClick={() => {
                                        handleClick(
                                            'up',
                                            restaurant._id,
                                            restaurant.restaurantName
                                        );
                                    }}
                                >
                                    <p
                                        className={
                                            Paragraphs[
                                                'vote-yes-or-no-icons-yes'
                                            ]
                                        }
                                    >
                                        <i className="far fa-check-circle"></i>
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
