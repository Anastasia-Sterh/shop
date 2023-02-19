export const search = async (values) => {

    const response = await fetch(`https://api.react-learning.ru/products/search?query=${values}`,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })

    if (response.ok == false) {

        const res = await response.json();
        throw new Error(res.message);
    }

    let result = await response.json();
    return result;

}

export const getMyProducts = async () => {
    const allProducts = await getProducts();
    const user = await getMe();
    const userID = user._id;
    const myProducts = allProducts.filter(product => product.author._id == userID);
    return myProducts;

}

export const editUser = async (user) => {

    const res = await fetch(`https://api.react-learning.ru/v2/9-gr/users/me`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(user)
    });

    if (res.ok == false) {

        const response = await res.json();
        throw new Error(response.message);
    }

    return user;
}

export const editAvatar = async (avatar) => {


    const res = await fetch(`https://api.react-learning.ru/v2/9-gr/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(avatar)
    });

    if (res.ok == false) {

        const response = await res.json();
        throw new Error(response.message);
    }

    return avatar;
}

export const getMe = async () => {


    const response = await fetch('https://api.react-learning.ru/v2/9-gr/users/me',
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });


    if (response.ok == false) {

        const res = await response.json();
        throw new Error(res.message);
    }

    let user = await response.json();
    return user;

}

export const getProducts = async () => {
    let response = await fetch('https://api.react-learning.ru/products',
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });

    if (response.ok == false) {

        const res = await response.json();
        throw new Error(res.message);
    }

    let positions = await response.json();
    return positions.products;
}

export const signup = async (newUser) => {
    const res = await fetch('https://api.react-learning.ru/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    });

    if (res.ok) {
        return true;
    } else {
        const response = await res.json();
        throw new Error(response.message);

    }
}

export const signin = async (valuesSignIn) => {
    const res = await fetch('https://api.react-learning.ru/signin', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(valuesSignIn)
    })

    if (res.ok) {
        const response = await res.json();
        localStorage.setItem('token', response.token);

        return true;
    } else {
        const response = await res.json();
        throw new Error(response.message);

    }

}

export const isUserAuth = async () => {

    if (localStorage.getItem('token') == undefined) {
        return false;
    }

    try {
        let response = await fetch('https://api.react-learning.ru/v2/9-gr/users/me', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });

        if (response.ok == false) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
}

export const getOneProduct = async (productID) => {

    let response = await fetch(`https://api.react-learning.ru/products/${productID}`,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });

    if (response.ok == false) {

        const res = await response.json();
        throw new Error(res.message);
    }

    let product = await response.json();
    return product;

}

export const getManyProducts = async (productsIDs) => {
    let products = [];
    for (const productID of productsIDs) {
        products.push(getOneProduct(productID))
    }

    console.log(products);
    return await Promise.all(products);
}

export const getReviewsOneProduct = async (productID) => {
    let response = await fetch(`https://api.react-learning.ru/products/review/${productID}`,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });

    if (response.ok == false) {

        const res = await response.json();
        throw new Error(res.message);
    }

    let review = await response.json();
    return review;

}

export const addProduct = async (product) => {

    const res = await fetch('https://api.react-learning.ru/products',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(product)
        });

    if (res.ok == false) {

        const response = await res.json();
        throw new Error(response.message);
    }

    return product;

}

export const deleteProduct = async (productID) => {
    const res = await fetch(`https://api.react-learning.ru/products/${productID}`,
        {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },

        })


    if (res.ok == false) {

        const response = await res.json();
        throw new Error(response.message);
    }


}

export const editProduct = async (product) => {

    let productID = product._id;

    const res = await fetch(`https://api.react-learning.ru/products/${productID}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(product)
    });

    if (res.ok == false) {

        const response = await res.json();
        throw new Error(response.message);
    }

    return product;
}
