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

    const fixDate = (date: any) => {
        const fixedDate = new Date(date);
        console.log(fixedDate);

        return fixedDate.toString().split(' GMT')[0].slice(0, -3);
    };

    return (
        <div className="event-confirmation">
            <h2 className="page-header page-header-confirmation">
                Thanks {event && event.organiser} for creating your event.
            </h2>
            <div className="event-confirmation-text">
                <p>Voting will end at: {event && fixDate(event.endDate)}</p>
                <p>Here is your URL. </p>
                <p className="event-url">
                    {window.location.href.slice(0, -10) +
                        '/event/' +
                        event?.eventName}
                </p>

                <p>Please share with your friends!</p>
            </div>
        </div>
    );
}
