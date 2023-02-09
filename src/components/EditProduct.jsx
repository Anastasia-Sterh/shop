import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';
import { editProduct } from '../api';




const validateSchema = Yup.object({
    discount: Yup.number()
        .max(95, 'Скидка не может быть больше 100%'),
    stock: Yup.number()
        .max(100, 'Количество товаров не должно превышать ста единиц'),
    pictures: Yup.string().url('Добавьте ссылку на изображение товара').required('Добавьте ссылку на изображение товара'),
    // tags: Yup.string(),
    name: Yup.string()
        .min(3, 'Необходимо больше трех символов')
        .max(100, 'Не может превышать ста символов')
        .required('Введите название продукта'),
    price: Yup.number().required('Введите цену'),
    wight: Yup.string(),
    description: Yup.string()
        .required('Добавьте описание продукта')


});

export const EditProduct = ({ product, refetchMyProducts, setEditProductModalShown }) => {


    const { mutateAsync, isError, error, isLoading } = useMutation({
        mutationFn: async (values) => {
            const id = product._id
            values._id = id;
            const newTags = values.tags.split(',');
            values.tags = newTags;
            await editProduct(values);
            refetchMyProducts();
            setEditProductModalShown(false)
        }
    })


    const formik = useFormik({
        initialValues: {
            discount: product.discount,
            stock: product.stock,
            pictures: product.pictures,
            tags: product.tags.join(),
            name: product.name,
            price: product.price,
            wight: product.wight,
            description: product.description,
        },
        validationSchema: validateSchema,
        onSubmit: async (values) => {
            await mutateAsync(values)
        },
    });

    return (
        <>
            {isLoading ? (
                <CircularProgress color="secondary" className="loader" />
            ) : (
                <form onSubmit={formik.handleSubmit} className='form'>

                    <h3>Измените продукт</h3>

                    {isError && (
                        <p className="error--inWindow">{error.message}</p>
                    )}

                    <TextField className='input'
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
                        Редактировать
                    </Button>
                </form>
            )}
        </>
    );
};
