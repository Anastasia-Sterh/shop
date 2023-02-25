import { TextField, Button } from "@mui/material";
import { editAvatar } from "../../api";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';


const validateSchema = Yup.object({
    avatar: Yup.string()

})

export function EditUserAvatarModal({ user, setEditAvatarModalShown, refetch }) {

    const { mutateAsync, isError, error, isLoading } = useMutation({
        mutationFn: (values) => editAvatar(values)
    })


    const formik = useFormik({
        initialValues: {
            avatar: user.avatar,


        },
        validationSchema: validateSchema,
        onSubmit: async (values) => {

            await mutateAsync(values)

            setEditAvatarModalShown(false)
            refetch()
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
                        id="avatar"
                        name="avatar"
                        label="avatar"
                        type="text"
                        value={formik.values.avatar}
                        onChange={formik.handleChange}
                        error={formik.touched.avatar && Boolean(formik.errors.avatar)}
                        helperText={formik.touched.avatar && formik.errors.avatar}
                    />
                    <Button variant="contained" color="secondary" type='submit' className='btn'>Изменить</Button>
                </form>


            )
            }
        </>
    )
}