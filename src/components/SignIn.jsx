import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';




export function SignIn() {

    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');

    const navigate = useNavigate();
    const clickToMain = () => {
        return navigate('/main')
    }

    let valuesSignIn = {
        email: email,
        password: password
    }

    const onSingInClick = async () => {
        console.log(valuesSignIn);
        try {
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
                clickToMain()
            } else {
                alert("Ошибка HTTP: " + res.status);
            }



        } catch (error) {
            alert(error.message)

        }

        //
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