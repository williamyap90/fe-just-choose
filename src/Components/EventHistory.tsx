import React, { useEffect, useState } from 'react';
import { fetchEventByOrganiser } from '../API-Funcs/API';
import Loading from './OrganiserJourney/SubComponents/Loading';
import Boxes from '../CSS/Boxes.module.css';
import Images from '../CSS/Images.module.css';
import Paragraphs from '../CSS/Paragraphs.module.css';
import { Link } from 'react-router-dom';

export default function EventHistory(props: any) {
    console.log(props.loggedInUser);
    const [eventHistory, setEventHistory] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchEventByOrganiser(props.loggedInUser.name).then((response) => {
            setEventHistory(response.events);
            setIsLoading(false);
        });
    }, []);
    if (eventHistory) console.log(eventHistory[0]);

    if (isLoading) return <Loading />;

    const createStars = (rating: number) => {
        console.log(rating, 'rating in createStars');
        console.log(Math.floor(rating / 1));
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
        console.log(fixedDate);

        return fixedDate.toString().split(' GMT')[0].slice(0, -3);
    };

    return (
        <div>
            <h1 className="page-header page-header-eventhistory">
                Your Profile
            </h1>
            <h2 className="page-event-history">Here is your event history:</h2>
            {eventHistory &&
                eventHistory.map((event: any) => {
                    return (
                        <div
                            key={event.restaurantList[0].restaurant_id}
                            className={Boxes['restaurant-info-container']}
                        >
                            <p
                                className={
                                    Paragraphs['restaurant-info-title-events']
                                }
                            >
                                <strong>Event name:</strong> {event.eventName}{' '}
                            </p>
                            <p
                                className={
                                    Paragraphs['restaurant-info-title-events']
                                }
                            >
                                <strong>Event date:</strong>{' '}
                                {fixDate(event.endDate)}{' '}
                            </p>

                            <p
                                className={
                                    Paragraphs['restaurant-info-title-events']
                                }
                            >
                                <strong>Link to event:</strong>{' '}
                                <Link
                                    className="event-link"
                                    to={'/event/' + event?.eventName}
                                >
                                    Here
                                </Link>{' '}
                            </p>
                            <p
                                className={
                                    Paragraphs['restaurant-info-title-events']
                                }
                            >
                                <strong>Winning restaurant:</strong>{' '}
                                {event.restaurantList[0].restaurantName}{' '}
                            </p>
                            <p
                                className={
                                    Paragraphs['restaurant-subtitle-event']
                                }
                            >
                                {event.restaurantList[0].categories.map(
                                    (category: string, index: number) => {
                                        return index < 5 && category + ' . ';
                                    }
                                )}
                            </p>

                            <img
                                className={Images['restaurant-info-picture']}
                                src={event.restaurantList[0].imageUrl}
                            ></img>
                            <p
                                className={
                                    Paragraphs['restaurant-info-additional']
                                }
                            >
                                {createStars(event.restaurantList[0].rating)}
                            </p>
                            <p
                                className={
                                    Paragraphs['restaurant-info-additional']
                                }
                            >
                                <a href={event.restaurantList[0].url}>
                                    Website
                                </a>
                            </p>
                            <p className="event-votes">
                                Total votes: {event.restaurantList[0].upvotes}
                            </p>
                        </div>
                    );
                })}
        </div>
    );
}
