import Boxes from '../../../CSS/Boxes.module.css';

interface Props {
    totalNumberOfResults: number;
    setFilters: (val: any) => void;
    filters: any;
}
export default function Pagination(props: Props) {
    const handleClick = (e: any) => {
        props.setFilters((currFilters: any) => {
            const newFilters = { ...currFilters };
            newFilters.offset =
                e.target.id === 'next'
                    ? (newFilters.offset += 10)
                    : (newFilters.offset -= 10);
            return newFilters;
        });
    };
    return (
        <div className={Boxes['pagination-container']}>
            {props.filters.offset > 0 && (
                <i
                    id="prev"
                    onClick={handleClick}
                    className="fas fa-angle-double-left fa-lg"
                ></i>
            )}
            Display results {props.filters.offset + 1} -{' '}
            {props.filters.offset + 10} of {props.totalNumberOfResults}
            {props.totalNumberOfResults >
                props.filters.offset + props.filters.limit && (
                <i
                    id="next"
                    onClick={handleClick}
                    className="fas fa-angle-double-right fa-lg"
                ></i>
            )}
        </div>
    );
}
