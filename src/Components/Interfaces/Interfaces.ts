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

