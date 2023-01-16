import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { editUser, editAvatar, getMe } from '../Api';

export function EditUserModal({ user, setUser, setEditModalShown }) {

    const [userName, setUserName] = useState(user.name)
    const [userAbout, setUserAbout] = useState(user.about)
    const [userAvatar, setUserAvatar] = useState(user.avatar)

    let editUserBtn = async () => {

        let newUser = {
            name: userName,
            about: userAbout,
        }

        let newUserAvatar = {
            avatar: userAvatar
        }

        try {
            await editUser(newUser);
            await editAvatar(newUserAvatar);
            let info = await getMe()
            setUser(info)
            setEditModalShown(false)
        } catch (err) {
            alert(err)
        }

    }

    return (
        <div className="App">

            <Paper className='paper' elevation={3} >
                <p>Отредактируйте данные</p>
                <TextField name="name" label="Имя" type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />
                <TextField name="about" label="О вас" type="text" value={userAbout} onChange={(e) => setUserAbout(e.target.value)} />
                <TextField name="avatar" label="Ссылка на аватар" type="text" value={userAvatar} onChange={(e) => setUserAvatar(e.target.value)} />

                <Button variant="contained" color="secondary" onClick={() => { editUserBtn() }}>Изменить</Button>
                <a style={{ cursor: 'pointer' }} onClick={() => { setEditModalShown(false) }}>Назад</a>
            </Paper>

        </div>
    )
}