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