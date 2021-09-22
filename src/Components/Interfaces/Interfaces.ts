export interface IFilters {
    location: string;
    radius: null | string;
    limit: null | number;
    sort_by: null | string;
    price: null | string;
    offset: number;
  }

export interface IUser {
    name: string;
    status: "registered" | "guest";
  }


  export interface IYelpRestaurant{
    [key:string]: any;
  }

  export interface IEvent {
    eventName : string;
    organiser : string;
    isDraft : boolean;
    _id : string;
    dateCreated : string;
    endDate : string;
    eventURL : string | null;
    restaurantList : ISavedRestaurant[];
    votes : any;
    winningRestaurant : any;
  }

  export interface IVotes {
    restaurantName : string,
    restaurantID : string,
    voteType : string,
  }


  export interface ISavedRestaurant {
    _id : string;
    categories : string[];
    coordinates : { latitude : string, longitude : string };
    displayAddress : string[];
    downvotes : number;
    upvotes : number;
    imageUrl : string;
    price : string;
    rating : number;
    restaurantName : string;
    url : string;
  }