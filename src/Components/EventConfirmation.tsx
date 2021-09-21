import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { fetchEvent } from "../API-Funcs/API";
import Loading from "./Loading";

interface Props {
    eventName: string;
    setEventName: (val: string) => void;
}
export default function EventConfirmation(props : Props) {
    const [event, setEvent] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        console.log(props.eventName)

        fetchEvent(props.eventName)
        .then((response: any) => {
            setEvent(response.event[0])
            setIsLoading(false);
        })
        .catch((e) => {
            console.log(e);
        })
    }, [])
    if(isLoading) 
    return <Loading />
    return (
        <div>
            <p>Thanks {event.organiser} for creating your event.</p>
            <p>Voting will end at: {event.endDate}</p>
            <p>Here is your URL. http://localhost:3000/event/{event.eventName} </p>
            <p>PLease share with your friends</p>
        </div>
    )
}
