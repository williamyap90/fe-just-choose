import { useEffect, useState } from "react"
import { fetchEvent } from "../../API-Funcs/API";
import Loading from "./SubComponents/Loading";
import { IEvent } from "../Interfaces/Interfaces";


interface Props {
    eventName: string;
    setEventName: (val: string) => void;
}
export default function EventConfirmation(props : Props) {
    const [event, setEvent] = useState<IEvent | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    //fetches the newly created event from database
    useEffect(() => {
        setIsLoading(true);
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
            <p>Thanks {event && event.organiser} for creating your event.</p>
            <p>Voting will end at: {event && event.endDate}</p>
            <p>Here is your URL.  </p> 
            <p>{window.location.href.slice(0,-10)+'/event/'+event?.eventName}</p>
            <p>PLease share with your friends</p>
        </div>
    )
}