interface Props {
    event: any;
  }
export default function HasVoted(props : Props) {
    return (
        <div>
            <h1>Thanks for voting</h1>
            <h2> Voting will end at {props.event.endDate}</h2>
            <p>Check back later to see the results</p>
        </div>
    )
}
