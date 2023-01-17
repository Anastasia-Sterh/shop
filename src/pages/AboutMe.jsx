import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

import EditIcon from '@mui/icons-material/Edit';
import { EditUserModal } from "../components/EditUserModal";
import { getMe } from "../Api";


export function AboutMe() {

    const [user, setUser] = useState()
    const [editModalShown, setEditModalShown] = useState(false)

    useEffect(() => {
        getMe()
            .then((user) => {
                setUser(user)
            })
            .catch(err => alert(err))
    }, [])

    if (user == undefined) {

        return (
            <>

                <CircularProgress color="secondary" className="loader" />
            </>
        )

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

            {editModalShown ? <EditUserModal setEditModalShown={setEditModalShown} user={user} setUser={setUser} /> : ''}

        </>
    )
}