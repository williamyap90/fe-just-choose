import Boxes from "../../CSS/Boxes.module.css";
import Paragraphs from "../../CSS/Paragraphs.module.css";
import Forms from "../../CSS/Forms.module.css";

interface Props {
    restaurantShortlist: any
}
export default function ShortlistSubmission(props: Props) {
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
        />
      </form>
      <p className={Paragraphs["shortlist-info"]}>
        Select restaurants from the selection to add to your shortlist
      </p>
    </section>
  );
}
