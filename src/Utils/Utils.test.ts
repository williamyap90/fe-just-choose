import { extractRestaurantInfo } from './Utils'

describe('Utility function to extract rstaurant info', () => {
    test('does not mutate input', () => {
        const restObj = {
            alias: "fuel-manchester",
            categories: [ {  alias : 'something', title : 'something else'}, {alias : 'something', title : 'sohtrgrgere'}, {alias : 'something', title : 'actual title'} ],
            coordinates: { latitude: 53.434600476997, longitude: -2.2280029755002 },
            display_phone: "+44 161 448 9702",
            distance: 514.4480246806926,
            id: "5I65hTQVn_-nuUunSjNxUw",
            image_url: "https://s3-media2.fl.yelpcdn.com/bphoto/kmCY9Gn_BUwK9W2mApgTcg/o.jpg",
            is_closed: false,
            location: { address1: "448 Wilmslow Road", city: "Manchester", zip_code: "M20 3BW", address2 : "", address3 : "", country : "gb", display_address : ["448 Wilmslow Road", "Manchester M20 3BW", "United Kingdom"], state : 'somethiongh', zipcode : 'hatever' },
            name: "Fuel",
            phone: "+441614489702",
            price: "£",
            rating: 4,
            review_count: 51,
            transactions: [],
            url: "https://www.yelp.com/biz/fuel-manchester?adjust_creative=NU9…ium=api_v3_business_search&utm_source=NU9lAcDMMPSLSkTaTUlw-g",
        }
        const input = [restObj];
        const inputCopy = [...input];
        extractRestaurantInfo(input);
        expect(input).toEqual(inputCopy);
    })
    test('returns a new array', () => {
        const input: any = [];
        expect(extractRestaurantInfo(input)).not.toBe(input);
    })

    test('remove unwanted properties' ,() => {
        const restObj = [{
            alias: "fuel-manchester",
            categories: [ {  alias : 'something', title : 'chinese'}, {alias : 'something', title : 'veggie'}, {alias : 'something', title : 'cuban'} ],
            coordinates: { latitude: 53.434600476997, longitude: -2.2280029755002 },
            display_phone: "+44 161 448 9702",
            distance: 514.4480246806926,
            id: "5I65hTQVn_-nuUunSjNxUw",
            image_url: "https://s3-media2.fl.yelpcdn.com/bphoto/kmCY9Gn_BUwK9W2mApgTcg/o.jpg",
            is_closed: false,
            location: { address1: "448 Wilmslow Road", city: "Manchester", zip_code: "M20 3BW", address2 : "", address3 : "", country : "gb", display_address : ["448 Wilmslow Road", "Manchester M20 3BW", "United Kingdom"], state : 'somethiongh', zipcode : 'hatever' },
            name: "Fuel",
            phone: "+441614489702",
            price: "£",
            rating: 4,
            review_count: 51,
            transactions: [],
            url: "https://www.yelp.com/biz/fuel-manchester?adjust_creative=NU9…ium=api_v3_business_search&utm_source=NU9lAcDMMPSLSkTaTUlw-g",
        }]

        const expectedOutput = [{
            display_phone: "+44 161 448 9702",
            categories : [ 'chinese', 'veggie', 'cuban'],
            name: 'Fuel',
            display_address : ["448 Wilmslow Road", "Manchester M20 3BW", "United Kingdom"],
            coordinates: { latitude: 53.434600476997, longitude: -2.2280029755002 },
            rating: 4,
            price: "£",
            distance: 514.4480246806926,
            url: "https://www.yelp.com/biz/fuel-manchester?adjust_creative=NU9…ium=api_v3_business_search&utm_source=NU9lAcDMMPSLSkTaTUlw-g",
            review_count: 51,
            image_url: "https://s3-media2.fl.yelpcdn.com/bphoto/kmCY9Gn_BUwK9W2mApgTcg/o.jpg",
        }]
        expect(extractRestaurantInfo(restObj)).toEqual(expectedOutput);
    })

    test('remove unwanted properties' ,() => {
        const restObj = {
            alias: "fuel-manchester",
            categories: [ {  alias : 'something', title : 'chinese'}, {alias : 'something', title : 'veggie'}, {alias : 'something', title : 'cuban'} ],
            coordinates: { latitude: 53.434600476997, longitude: -2.2280029755002 },
            display_phone: "+44 161 448 9702",
            distance: 514.4480246806926,
            id: "5I65hTQVn_-nuUunSjNxUw",
            image_url: "https://s3-media2.fl.yelpcdn.com/bphoto/kmCY9Gn_BUwK9W2mApgTcg/o.jpg",
            is_closed: false,
            location: { address1: "448 Wilmslow Road", city: "Manchester", zip_code: "M20 3BW", address2 : "", address3 : "", country : "gb", display_address : ["448 Wilmslow Road", "Manchester M20 3BW", "United Kingdom"], state : 'somethiongh', zipcode : 'hatever' },
            name: "Fuel",
            phone: "+441614489702",
            price: "£",
            rating: 4,
            review_count: 51,
            transactions: [],
            url: "https://www.yelp.com/biz/fuel-manchester?adjust_creative=NU9…ium=api_v3_business_search&utm_source=NU9lAcDMMPSLSkTaTUlw-g",
        };

        const expectedOutput = [{
            display_phone: "+44 161 448 9702",
            categories : [ 'chinese', 'veggie', 'cuban'],
            name: 'Fuel',
            display_address : ["448 Wilmslow Road", "Manchester M20 3BW", "United Kingdom"],
            coordinates: { latitude: 53.434600476997, longitude: -2.2280029755002 },
            rating: 4,
            price: "£",
            distance: 514.4480246806926,
            url: "https://www.yelp.com/biz/fuel-manchester?adjust_creative=NU9…ium=api_v3_business_search&utm_source=NU9lAcDMMPSLSkTaTUlw-g",
            review_count: 51,
            image_url: "https://s3-media2.fl.yelpcdn.com/bphoto/kmCY9Gn_BUwK9W2mApgTcg/o.jpg",
        }, {
            display_phone: "+44 161 448 9702",
            categories : [ 'chinese', 'veggie', 'cuban'],
            name: 'Fuel',
            display_address : ["448 Wilmslow Road", "Manchester M20 3BW", "United Kingdom"],
            coordinates: { latitude: 53.434600476997, longitude: -2.2280029755002 },
            rating: 4,
            price: "£",
            distance: 514.4480246806926,
            url: "https://www.yelp.com/biz/fuel-manchester?adjust_creative=NU9…ium=api_v3_business_search&utm_source=NU9lAcDMMPSLSkTaTUlw-g",
            review_count: 51,
            image_url: "https://s3-media2.fl.yelpcdn.com/bphoto/kmCY9Gn_BUwK9W2mApgTcg/o.jpg",
        }
    ]
        expect(extractRestaurantInfo([restObj, restObj])).toEqual(expectedOutput);
    })


})