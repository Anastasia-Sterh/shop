export const editUser = async (user) => {

    await fetch(`https://api.react-learning.ru/v2/9-gr/users/me`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(user)
    });

    return user;
}


export const editAvatar = async (avatar) => {


    await fetch(`https://api.react-learning.ru/v2/9-gr/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(avatar)
    });

    return avatar;
}

export const getMe = async () => {
    try {
        let response = await fetch('https://api.react-learning.ru/v2/9-gr/users/me',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            });
        let user = await response.json();
        console.log(user)
        return user;
    } catch (error) {
        alert(error.message)
    }
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
        alert("Ошибка HTTP: " + res.status + '; ' + response.message);
        return false;
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
        const responce = await res.json();
        localStorage.setItem('token', responce.token);

        return true;
    } else {
        alert("Ошибка HTTP: " + res.status);
        return false;
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
    try {
        let response = await fetch(`https://api.react-learning.ru/products/${productID}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            });
        let product = await response.json();
        return product;
    } catch (error) {
        alert(error.message)
    }
}

export const getReviewsOneProduct = async (productID) => {
    try {
        let response = await fetch(`https://api.react-learning.ru/products/review/${productID}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            });
        let review = await response.json();
        console.log(review)
        return review;
    } catch (error) {
        alert(error.message)
    }
}

