import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { signin } from '../Api';
import { FirstContext } from '../App';


export function SignIn() {

    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const { setIsAuth } = useContext(FirstContext)

    const navigate = useNavigate();
    const clickToMain = () => {
        console.log('ctm signin')
        return navigate('/main')
    }

    let valuesSignIn = {
        email: email,
        password: password
    }

    const onSingInClick = async () => {
        try {
            const res = await signin(valuesSignIn);

            if (res == true) {
                setIsAuth(true)
                clickToMain()
            }
        } catch (error) {
            alert(error.message)
        }
    }


    return (
        <div className="App">

            <Paper className='paper' elevation={3} >
                <p>Введите данные для авторизации</p>
                <TextField name="email" label="Почтовый адрес" type='email' value={email} onChange={(e) => SetEmail(e.target.value)} />
                <TextField name="password" label="Пароль" type="password" value={password} onChange={(e) => SetPassword(e.target.value)} />

                <Button variant="contained" color="secondary" onClick={async () => { await onSingInClick() }}>Войти</Button>
                <a onClick={() => { navigate('/') }}>Назад</a>
            </Paper>

        </div>
    )
}