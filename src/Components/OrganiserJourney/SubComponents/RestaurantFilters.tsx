import Boxes from '../../../CSS/Boxes.module.css';
import Paragraphs from '../../../CSS/Paragraphs.module.css';
import Forms from '../../../CSS/Forms.module.css';
import { getRestaurants } from '../../../API-Funcs/API';
import { IFilters, IUser } from '../../Interfaces/Interfaces';

interface Props {
    loggedInUser: IUser | null;
    filters: IFilters;
    setFilters: any;
    setIsLoading: (val: boolean) => void;
    setRestaurantSelection: any;
    setTotalNumberOfResults: (val: number) => void;
}
export default function RestaurantFilters(props: Props) {
    type InputEvent = React.ChangeEvent<HTMLInputElement>;
    type SubmitEvent = React.FormEvent<HTMLFormElement>;
    type SelectEvent = React.ChangeEvent<HTMLSelectElement>;

    const handleChange = (e: SelectEvent | InputEvent) => {
        props.setFilters((currFilters: IFilters) => {
            const newFilters = { ...currFilters };
            switch (e.target.id) {
                case 'Distance':
                    newFilters.radius = e.target.value;
                    break;
                case 'price':
                    newFilters.price = e.target.value;
                    break;
                case 'sort_by':
                    newFilters.sort_by = e.target.value;
                    break;
                case 'location':
                    newFilters.location = e.target.value;
                    break;
            }
            return newFilters;
        });
    };

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        getRestaurantsFromYelp();
        //jump to shortlisted restaurants
    };

    const getRestaurantsFromYelp = () => {
        if (props.filters.location.length >= 1) {
            props.setIsLoading(true);
            getRestaurants(props.filters)
                .then((response) => {
                    props.setRestaurantSelection(
                        response.restaurants.businesses
                    );
                    props.setTotalNumberOfResults(response.restaurants.total);
                    props.setIsLoading(false);
                })
                .catch((e: any) => {
                    console.log(e);
                });
        }
    };

    return (
        <section className="filters">
            <h1 className="page-header page-header-shortlist">Just Choose!</h1>
            <form className={Forms['filters-form']} onSubmit={handleSubmit}>
                <label htmlFor="Location">
                    <p className={Paragraphs['form-label-paragraph']}>
                        {' '}
                        Enter a postcode or location name{' '}
                    </p>
                </label>
                <input
                    type="text"
                    name="Location"
                    id="location"
                    value={props.filters.location}
                    onChange={handleChange}
                    className={Forms['filters-form-element']}
                />
                <label htmlFor="Distance">
                    <p className={Paragraphs['form-label-paragraph']}>
                        {' '}
                        Choose a radius{' '}
                    </p>
                </label>
                <select
                    className={Forms['filters-form-element']}
                    onChange={handleChange}
                    name="Distance"
                    id="Distance"
                >
                    <option value="1000"> 1km</option>
                    <option value="2000"> 2km</option>
                    <option value="3000"> 3km</option>
                    <option value="4000"> 4km</option>
                    <option value="5000"> 5km</option>
                    <option value="10000"> 10km</option>
                    <option value="20000"> 20km</option>
                </select>

                <label htmlFor="price">
                    <p className={Paragraphs['form-label-paragraph']}>
                        {' '}
                        Price range
                    </p>
                </label>
                <select
                    className={Forms['filters-form-element']}
                    onChange={handleChange}
                    name="price"
                    id="price"
                >
                    <option value="1">£</option>
                    <option value="2">££</option>
                    <option value="3">£££</option>
                    <option value="4">££££</option>
                </select>

                <label htmlFor="sort_by">
                    <p className={Paragraphs['form-label-paragraph']}>
                        Sort By
                    </p>
                </label>
                <select
                    className={Forms['filters-form-element']}
                    onChange={handleChange}
                    name="sort_by"
                    id="sort_by"
                >
                    <option value="distance">Distance</option>
                    <option value="rating">Rating</option>
                    <option value="review_count">Review Count</option>
                </select>

                <input
                    className="primary-button-filters"
                    type="submit"
                    value="Find Restaurants"
                />
            </form>
        </section>
    );
}
