import Boxes from '../../CSS/Boxes.module.css'




interface Props {
    totalNumberOfResults: number;
    setFilters : (val: any) => void;
    filters : any;
}
export default function Pagination(props: Props) {
    
    const handleClick = (e: any) => {
        props.setFilters((currFilters: any) => {
            console.log(e)
            console.log(e.target);
            const newFilters = {...currFilters};
            newFilters.offset = e.target.id === 'next' ? newFilters.offset+=10 : newFilters.offset-=10;
            console.log(newFilters)
            return newFilters;
        })
    }
    return (
        <div className={Boxes["pagination-container"]}>
            { props.filters.offset > 0 &&  <i id="prev" onClick={handleClick} className="fas fa-arrow-left"></i>}
            Display results {props.filters.offset+1} - {props.filters.offset + 10} of {props.totalNumberOfResults}
            { props.totalNumberOfResults > props.filters.offset + props.filters.limit && <i id="next" onClick={handleClick} className="fas fa-arrow-right"></i>}
        </div>
    )
}


