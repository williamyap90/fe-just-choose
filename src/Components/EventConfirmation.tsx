import { useEffect, useState } from "react"
import { fetchEvent } from "../API-Funcs/API";
import Loading from "./Loading";

interface Props {
    eventName: string;
    setEventName: (val: string) => void;
}
export default function EventConfirmation(props : Props) {
    const [event, setEvent] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        //api call
        setIsLoading(true);
        fetchEvent(props.eventName)
        .then((response: any) => {
            setEvent(response)
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
            {/* <p>THanks {event.organiser} for creating your event.</p> */}
            {/* <p>VOting will end at: {event.endDate}</p> */}
            <p>Here is your URL. PLease share with your friends</p>
        </div>
    )
}
