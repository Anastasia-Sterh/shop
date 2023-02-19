export const initialState = {
    productsInCart: [],
    search: {
        search: '',
    }
}

export const getInitialState = () => {
    const productFromLS = window.localStorage.getItem('productsInCart')

    return productFromLS ? JSON.parse(productFromLS) : initialState;
}