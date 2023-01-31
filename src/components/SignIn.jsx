import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { signin } from '../api';
import { FirstContext } from '../App';
import { useMutation } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const validateSchema = Yup.object({
    email: Yup.string()
        .required('Это поле обязательное для заполнения'),
    password: Yup.string()
        .required('Это поле обязательное для заполнения'),
})

export function SignIn() {

    const { refetchAuth } = useContext(FirstContext)
    const navigate = useNavigate();
    const clickToMain = () => {
        return navigate('/main')
    }

    const { mutateAsync, isError, error, isLoading } = useMutation({
        mutationFn: async (valuesSignIn) => {
            await signin(valuesSignIn)
            await refetchAuth()
            clickToMain()
        }
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',

        },
        validationSchema: validateSchema,
        onSubmit: async (values) => {
            await mutateAsync(values)

        },
    });

    return (
        // <div className="App" >
        <form onSubmit={formik.handleSubmit} className='form'>
            <Paper className='paper' elevation={3} >

                {isLoading ? (
                    <CircularProgress color="secondary" className="loader" />
                ) : (

                    <>
                        <p>Введите данные для авторизации</p>

                        {isError && (
                            <p className="error_inWindow">{error.message}</p>
                        )}

                        <TextField className='input'
                            id="email"
                            name="email"
                            label="email"
                            type='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField className='input'
                            id="password"
                            name="password"
                            label="password"
                            type='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />

                        <Button variant="contained" color="secondary" type='submit'>Войти</Button>
                        <a onClick={() => { navigate('/signup') }}>Вернуться к регистрации</a>
                    </>
                )}

            </Paper>
        </form>
        // </div >
    )
}