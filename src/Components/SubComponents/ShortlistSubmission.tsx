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

    const handleClick = ((e: ClickEvent) => {
        props.setReviewingShortlist(true);
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
