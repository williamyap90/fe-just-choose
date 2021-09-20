import Boxes from "../../CSS/Boxes.module.css";
import Paragraphs from "../../CSS/Paragraphs.module.css";
import Forms from "../../CSS/Forms.module.css";
import { MouseEventHandler } from "react";

interface Props {
    restaurantShortlist: any;
    setReviewingShortlist: any;
}
export default function ShortlistSubmission(props: Props) {
    type ClickEvent = React.MouseEvent<HTMLInputElement>;

    //change handleclick to be a handlesubmit and put it in form element rather than input element. 
    const handleClick = ((e: ClickEvent) => {
        e.preventDefault();
        if(props.restaurantShortlist.length > 1) {
          props.setReviewingShortlist(true);
        } else {
          //need better error message - or jsut dont render button unless there are enough restaurants in shortlist
          alert('Need at least 2 restaurants in shortlist')
        }
    })

  return (
    <section className={Boxes["shortlist-info-presubmission-container"]}>
      <p className={Paragraphs["shortlist-info"]}>
        Restaurants shortlisted: {props.restaurantShortlist.length}
      </p>
      <form className={Forms["shortlist-submission"]}>
        <input
          className={Forms["shortlist-submission-button"]}
          type="submit"
          value="Review List"
          onClick={handleClick}
        />
      </form>
      <p className={Paragraphs["shortlist-info"]}>
        Select restaurants from the selection to add to your shortlist
      </p>
    </section>
  );
}
