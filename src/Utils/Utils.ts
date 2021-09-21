export const extractRestaurantInfo = (shortlist: any) => {

    const newShortList = shortlist.map((restObj: any) => {
        const newObj: any = {};
        for(const property in restObj) {
            if(property === 'categories') {
                const categoryArray = restObj.categories.map((catObj: any) => {
                    return catObj.title;
                })
                newObj['categories'] = categoryArray;
            }

            if(property === 'coordinates') {
                newObj['coordinates'] = {...restObj.coordinates}
            }

            if(property === 'display_phone') {
                newObj['display_phone'] = restObj.display_phone;
            }

            if(property === 'distance') {
                newObj['distance'] = restObj.distance;
            }

            if(property === 'image_url') {
                newObj['imageUrl'] = restObj.image_url;
            }
            if(property === 'name') {
                newObj['restaurantName'] = restObj.name;
            }
            if(property === 'price') {
                newObj['price'] = restObj.price;
            }
            if(property === 'rating') {
                newObj['rating'] = restObj.rating;
            }
            if(property === 'review_count') {
                newObj['review_count'] = restObj.review_count;
            }
            if(property === 'url') {
                newObj['url'] = restObj.url;
            }
            if(property === 'location') {
                if(restObj.location) {
                    newObj['display_address'] = [...restObj.location.display_address]
                }
            }

        }

        return newObj;
    })
    return newShortList
}