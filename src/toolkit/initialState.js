export const initialState = {
    productsInCart: [],
    search: {
        search: '',
    },
    haveCheckbox: [],
    favorites: []
}

export const getInitialState = () => {
    const productFromLS = window.localStorage.getItem('allState')

    return productFromLS ? JSON.parse(productFromLS) : initialState;
}