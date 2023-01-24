import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { EditUserModal } from "../components/EditUserModal";
import { getMe } from "../Api";
import { AddProduct } from "../components/AddProduct"





export function AboutMe() {



    const [user, setUser] = useState()
    const [editModalShown, setEditModalShown] = useState(false)
    const [addModalShown, setAddModalShown] = useState(false)
    const [cardProductUser, setCardProductUser] = useState();

    console.log(cardProductUser)

    const onAddProductClick = () => {
        console.log('me')
        setAddModalShown(true)
    }

    useEffect(() => {
        getMe()
            .then((user) => {
                setUser(user)
            })
            .catch(err => alert(err))
    }, [])

    if (user == undefined) {

        return <CircularProgress color="secondary" className="loader" />

    }
    return (
        <>

            <div className="userWindow">
                <div className="userWindowContent">
                    <div className='userWindowAvatar' style={{ backgroundImage: `url(${user.avatar})` }}> </div>
                    <h1>{user.name} <EditIcon style={{ cursor: 'pointer' }} onClick={() => { setEditModalShown(editModalShown ? false : true) }} /> </h1>
                    <p> {user.about} </p>
                </div>
            </div>
            <h1>Мои продукты</h1>
            <div className="about-me__add" onClick={() => { onAddProductClick(); }}>
                <AddIcon style={{ fontSize: '80px', color: 'gray' }} />
            </div>
            {editModalShown ? <EditUserModal setEditModalShown={setEditModalShown} user={user} setUser={setUser} /> : ''}
            {addModalShown ? <AddProduct setAddModalShown={setAddModalShown} setCardProductUser={setCardProductUser} cardProductUser={cardProductUser} /> : ''}
        </>
    )
}