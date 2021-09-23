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
                console.log(response.event);
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
        console.log('updating votes for ' + id + ' and ' + restaurantName);
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
        console.log('You swiped: ' + direction);

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

    const onCardLeftScreen = (myIdentifier: any) => {
        console.log(myIdentifier + ' left the screen');
    };

    if (isLoading) return <Loading />;

    let currTime = new Date();
    let endTime;
    if (event) {
        endTime = new Date(event.endDate);
        if (endTime < currTime) {
            console.log('hmm');
            return <Results />;
        }
    }
    if (hasVoted) return <Results />;

    //else the voting page.... :
    return (
        <div>
            <h2 className="page-header page-header-voting">
                You have been invited to vote at {event && event.eventName}
            </h2>
            <div className="voting-page-text">
                <p>Swipe right to vote yes, swipe left to vote no</p>
                <p>Voting will end at {event && event.endDate}</p>
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
                                onCardLeftScreen={() =>
                                    onCardLeftScreen('fooBar')
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

                                    <p>
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
                                    <p>
                                        Rating:{' '}
                                        {restaurant && restaurant.rating}
                                    </p>
                                </div>
                            </TinderCard>

                            <div className={Boxes['vote-yes-or-no-container']}>
                                <button
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
                                            Paragraphs['vote-yes-or-no-icons']
                                        }
                                    >
                                        <i className="fas fa-times"></i>
                                    </p>
                                </button>
                                <button
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
                                            Paragraphs['vote-yes-or-no-icons']
                                        }
                                    >
                                        <i className="fas fa-check"></i>
                                    </p>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
