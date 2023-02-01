import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { signup, signin } from '../api';
import { FirstContext } from '../App';
import { useMutation } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const validateSchema = Yup.object({
    email: Yup.string().email()
        .required('Это поле обязательное для заполнения'),
    password: Yup.string()
        .required('Это поле обязательное для заполнения'),
    group: Yup.string()
        .required('Это поле обязательное для заполнения'),
})

export function SignUp() {

    const navigate = useNavigate();
    const { refetchAuth } = useContext(FirstContext)

    const clickToMain = () => {
        return navigate('/main')
    }

    const goToSignIn = () => {
        return navigate("/signin")
    }

    const { mutateAsync, isError, error, isLoading } = useMutation({
        mutationFn: async (values) => {
            await signup(values)

            const valuesSignIn = {
                email: values.email,
                password: values.password
            }

            await signin(valuesSignIn)
            await refetchAuth()
            clickToMain()
        }
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            group: '9-gr'

        },
        validationSchema: validateSchema,
        onSubmit: async (values) => {
            await mutateAsync(values)
        },
    });


    return (
        <div className="App">
            <form onSubmit={formik.handleSubmit} className='form'>
                <Paper className='paper' elevation={3} >
                    {isLoading ? (
                        <CircularProgress color="secondary" className="loader" />
                    ) : (
                        <>
                            <p>Войдите или зарегистрируйтесь</p>

                            {isError && (
                                <p className="error--inWindow">{error.message}</p>
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
                            <TextField className='input'
                                id="group"
                                name="group"
                                label="group"
                                type='group'
                                value={formik.values.group}
                                onChange={formik.handleChange}
                                error={formik.touched.group && Boolean(formik.errors.group)}
                                helperText={formik.touched.group && formik.errors.group}
                            />

                            <Button variant="contained" color="secondary" type='submit'>Зарегистрироваться</Button>
                            <p>Уже зарегистрированы?</p>
                            <Button variant="contained" color="secondary" onClick={() => { goToSignIn() }}>Войти</Button>
                        </>
                    )}

                </Paper>
            </form>
        </div>
    );
}