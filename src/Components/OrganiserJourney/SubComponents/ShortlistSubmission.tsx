import Boxes from '../../../CSS/Boxes.module.css';
import Paragraphs from '../../../CSS/Paragraphs.module.css';
import { IYelpRestaurant } from '../../Interfaces/Interfaces';

interface Props {
    restaurantShortlist: IYelpRestaurant[];
    setReviewingShortlist: (val: boolean) => void;
}
export default function ShortlistSubmission(props: Props) {
    type ClickEvent = React.MouseEvent<HTMLButtonElement>;

    const handleClick = (e: ClickEvent) => {
        e.preventDefault();
        if (props.restaurantShortlist.length > 1) {
            props.setReviewingShortlist(true);
        } else {
            //need better error message - or jsut dont render button unless there are enough restaurants in shortlist
            alert('Need at least 2 restaurants in shortlist');
        }
    };

    return (
        <section className={Boxes['shortlist-info-presubmission-container']}>
            <p className={Paragraphs['shortlist-info']}>
                Select restaurants from the selection to add to your shortlist
            </p>
            {props.restaurantShortlist.length > 1 && (
                <button onClick={handleClick}>Review List</button>
            )}
            <p className={Paragraphs['shortlist-info']}>
                Restaurants shortlisted: {props.restaurantShortlist.length}
            </p>
        </section>
    );
}
