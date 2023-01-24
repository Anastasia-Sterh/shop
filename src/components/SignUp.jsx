import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { signup, signin } from '../Api';
import { FirstContext } from '../App';

export function SignUp() {
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [group, SetGroup] = useState('9-gr');

    const navigate = useNavigate();
    const { setIsAuth } = useContext(FirstContext)

    const clickToMain = () => {
        console.log('ctm signup')
        return navigate('/main')
    }


    const goToSignIn = () => {
        return navigate("/signIn")
    }

    let newUser = {
        email: email,
        password: password,
        group: group
    }


    const addNewUser = async (newUser) => {
        try {
            const res = await signup(newUser);

            if (res == true) {
                const valuesSignIn = {
                    email: newUser.email,
                    password: newUser.password
                }

                await signin(valuesSignIn)
                setIsAuth(true)
                clickToMain()
            }

        } catch (err) {
            alert(err.message)
        }
    }


    return (


        <div className="App">

            <Paper className='paper' elevation={3} >

                <p>Войдите или зарегистрируйтесь</p>
                <TextField name="email" label="Почтовый адрес" type='email' value={email} onChange={(e) => SetEmail(e.target.value)} />
                <TextField name="password" type="password" label="Пароль" value={password} onChange={(e) => SetPassword(e.target.value)} />
                <TextField name="group" label="Группа" value={group} onChange={(e) => SetGroup(e.target.value)} />

                <Button variant="contained" color="secondary" onClick={async () => { await addNewUser(newUser); }}>Зарегистрироваться</Button>
                <p>Уже зарегистрированы?</p>
                <Button variant="contained" color="secondary" onClick={() => { goToSignIn() }}>Войти</Button>

            </Paper>

        </div>
    );
}