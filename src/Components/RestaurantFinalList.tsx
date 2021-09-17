import "../CSS/RestaurantFinalList.css"
import Boxes from "../CSS/Boxes.module.css";
import Paragraphs from "../CSS/Paragraphs.module.css";

interface Props {
    restaurantShortlist: any;
    setRestaurantShortlist : any;
}
const RestaurantFinalList = (props: Props) => {
    type ClickEvent = React.MouseEvent<HTMLParagraphElement>;

    const handleClick = (e: ClickEvent) => {
        console.log(e);
        
        return;
    }
    return (
        <section>
          
            <h2>Summary</h2>
            <input type="text" placeholder="Enter Event Name"></input>

            { props.restaurantShortlist.map((restaurant: any) => {
                return (
                    <div className={Boxes["shortlisted-restaurant-container"]}>
                        <p className={Paragraphs["shortlisted-restaurant-info"]}>
                            {restaurant.name} - {restaurant.rating} - {restaurant.id}
                        </p>
                        <p  onClick={() => {
                            props.setRestaurantShortlist((currShortlist: any) => {
                                const newShortList = [...currShortlist];
                                console.log(newShortList);
                                const index = newShortList.findIndex((rest: any) => rest.id === restaurant.id);
                                newShortList.splice(index, 1);
                                return newShortList;
                            })
                        }} className={Paragraphs["delete-icon"]}><i className="fas fa-trash"></i></p>
                    </div>
                )
            })}
                
                  
                   
                  



                
            
            <div className="Buttons">
                <button>Edit List</button>
                <button>Confirm</button>   
            </div>
        </section>
    );
};

export default RestaurantFinalList;