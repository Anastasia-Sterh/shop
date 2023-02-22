
export function formatDate(actualDate) {
    let newDate = new Date(actualDate);
    return newDate.toLocaleDateString()

}

export function optionalPrice(price, discount) {

    let new_price = Math.round(price - (price / 100 * discount));
    return new_price;

}



