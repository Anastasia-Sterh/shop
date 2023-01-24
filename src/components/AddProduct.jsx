import * as Yup from 'yup';
import { useFormik } from 'formik';
import { addProduct } from '../Api';
import { Button, Paper, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const validateSchema = Yup.object({
    discount: Yup.number()
        .min(2, 'Минимальная скидка - 2%')
        .max(100, 'Скидка не может быть больше 100%'),
    stock: Yup.number()
        .max(100, 'Количество товаров не должно превышать ста единиц'),
    pictures: Yup.string().url('Добавьте ссылку на изображение товара').required('Добавьте ссылку на изображение товара'),
    tags: Yup.string(),
    name: Yup.string()
        .min(5, 'Необходимо больше пяти символов')
        .max(100, 'Не может превышать ста символов')
        .required('Введите название продукта'),
    price: Yup.number().required('Введите цену'),
    wight: Yup.string(),
    description: Yup.string()
        .required('Добавьте описание продукта')


});


export const AddProduct = ({ setCardProductUser, setAddModalShown, cardProductUser }) => {






    const formik = useFormik({
        initialValues: {
            discount: '',
            stock: '',
            pictures: '',
            tags: '',
            name: "",
            price: '',
            wight: "",
            description: "",
        },
        validationSchema: validateSchema,
        onSubmit: async (values) => {
            const newTags = values.tags.split(',');
            values.tags = newTags;
            await addProduct(values);
            setCardProductUser([...cardProductUser, values]);
            setAddModalShown(false)
        },
    });

    return (
        <>
            <div className='allScreen' onClick={() => setAddModalShown(false)}>
                <Paper className='addProduct__container' elevation={3} onClick={(e) => e.stopPropagation()}>
                    <CloseIcon className='icon' onClick={() => { setAddModalShown(false) }} />
                    <form onSubmit={formik.handleSubmit} className='form'>

                        <h3>Ваш новый продукт</h3>

                        <TextField className='input'
                            // fullWidth
                            id="discount"
                            name="discount"
                            label="discount"
                            type='number'
                            value={formik.values.discount}
                            onChange={formik.handleChange}
                            error={formik.touched.discount && Boolean(formik.errors.discount)}
                            helperText={formik.touched.discount && formik.errors.discount}
                        />

                        <TextField className='input'
                            // fullWidth
                            id="stock"
                            name="stock"
                            label="stock"
                            type="number"
                            value={formik.values.stock}
                            onChange={formik.handleChange}
                            error={formik.touched.stock && Boolean(formik.errors.stock)}
                            helperText={formik.touched.stock && formik.errors.stock}
                        />
                        <TextField className='input'
                            // fullWidth
                            id="pictures"
                            name="pictures"
                            label="pictures"
                            type="text"
                            value={formik.values.pictures}
                            onChange={formik.handleChange}
                            error={formik.touched.pictures && Boolean(formik.errors.pictures)}
                            helperText={formik.touched.pictures && formik.errors.pictures}
                        />
                        <TextField className='input'
                            // fullWidth
                            id="tags"
                            name="tags"
                            label="tags"
                            type="text"
                            value={formik.values.tags}
                            onChange={formik.handleChange}
                            error={formik.touched.tags && Boolean(formik.errors.tags)}
                            helperText={formik.touched.tags && formik.errors.tags}
                        />
                        <TextField className='input'
                            // fullWidth
                            id="name"
                            name="name"
                            label="name"
                            type="text"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField className='input'
                            // fullWidth
                            id="price"
                            name="price"
                            label="price"
                            type="number"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                        />
                        <TextField className='input'
                            // fullWidth
                            id="wight"
                            name="wight"
                            label="weight"
                            type="text"
                            value={formik.values.wight}
                            onChange={formik.handleChange}
                            error={formik.touched.wight && Boolean(formik.errors.wight)}
                            helperText={formik.touched.wight && formik.errors.wight}
                        />
                        <TextField className='input'
                            // fullWidth
                            id="description"
                            name="description"
                            label="description"
                            type="text"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />

                        <Button color="primary" variant="contained" type="submit" className='btn'>
                            Submit
                        </Button>
                    </form>
                </Paper>
            </div>
        </>
    );
};
