import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { editUser } from '../api';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';


const validateSchema = Yup.object({
    name: Yup.string(),
    about: Yup.string(),
})

export function EditUserModal({ user, setEditModalShown, refetch }) {

    const { mutateAsync, isError, error, isLoading } = useMutation({
        mutationFn: (values) => editUser(values)
    })

    const formik = useFormik({
        initialValues: {
            name: user.name,
            about: user.about,
        },
        validationSchema: validateSchema,
        onSubmit: async (values) => {

            await mutateAsync(values);
            setEditModalShown(false)
            refetch();

        },
    });

    return (
        <>
            {isLoading ? (
                <CircularProgress color="secondary" className="loader" />
            ) : (
                <form onSubmit={formik.handleSubmit} className='form'>
                    <p>Отредактируйте данные</p>

                    {isError && (
                        <p className="error--inWindow">{error.message}</p>
                    )}

                    <TextField className='input'
                        id="name"
                        name="name"
                        label="name"
                        type='text'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField className='input'
                        id="about"
                        name="about"
                        label="about"
                        type="text"
                        value={formik.values.about}
                        onChange={formik.handleChange}
                        error={formik.touched.about && Boolean(formik.errors.about)}
                        helperText={formik.touched.about && formik.errors.about}
                    />
                    <Button variant="contained" color="secondary" type='submit' className='btn'>Изменить</Button>
                </form>
            )
            }
        </>
    )
}