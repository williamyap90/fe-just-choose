import { useEffect, useState } from 'react';
import { fetchEvent } from '../../API-Funcs/API';
import Loading from './SubComponents/Loading';
import { IEvent } from '../Interfaces/Interfaces';

interface Props {
    eventName: string;
    setEventName: (val: string) => void;
}
export default function EventConfirmation(props: Props) {
    const [event, setEvent] = useState<IEvent | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    //fetches the newly created event from database
    useEffect(() => {
        setIsLoading(true);
        fetchEvent(props.eventName)
            .then((response: any) => {
                setEvent(response.event[0]);
                setIsLoading(false);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    if (isLoading) return <Loading />;

    return (
        <div className="event-confirmation">
            <h2 className="page-header page-header-confirmation">
                Thanks {event && event.organiser} for creating your event.
            </h2>
            <div className="event-confirmation-text">
                <p>Voting will end at: {event && event.endDate}</p>
                <p>Here is your URL. </p>
                <p>
                   <a href={window.location.href.slice(0, -10) +
                        '/event/' +
                        event?.eventName}>{window.location.href.slice(0, -10) +
                            '/event/' +
                            event?.eventName}</a>
                </p>
                <p>Please share with your friends!</p>
            </div>
        </div>
    );
}
