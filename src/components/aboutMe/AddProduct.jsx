import * as Yup from "yup";
import { useFormik } from "formik";
import { addProduct } from "../../api";
import { Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";

const validateSchema = Yup.object({
  discount: Yup.number()
    .max(100, "Скидка не может быть больше 100%")
    .min(0, "Скидка не может быть меньше нуля"),
  stock: Yup.number()
    .max(100, "Количество товаров не должно превышать ста единиц")
    .min(0, "Количество не может быть меньше нуля"),
  pictures: Yup.string()
    .url("Добавьте ссылку на изображение товара")
    .required("Добавьте ссылку на изображение товара"),
  tags: Yup.string(),
  name: Yup.string()
    .min(3, "Необходимо больше трех символов")
    .max(100, "Не может превышать ста символов")
    .required("Введите название продукта"),
  price: Yup.number()
    .min(0, "Продукт не может быть еще дешевле")
    .required("Введите цену"),
  wight: Yup.string(),
  description: Yup.string().required("Добавьте описание продукта"),
});

export const AddProduct = ({ setAddModalShown, refetchMyProducts }) => {
  const { mutateAsync, isError, error, isLoading } = useMutation({
    mutationFn: async (values) => {
      const newTags = values.tags.split(",");

      await addProduct({
        ...values,
        tags: newTags,
      });
      refetchMyProducts();
      setAddModalShown(false);
    },
  });

  const formik = useFormik({
    initialValues: {
      discount: "",
      stock: "",
      pictures: "",
      tags: "",
      name: "",
      price: "",
      wight: "",
      description: "",
    },
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      await mutateAsync(values);
    },
  });

  return (
    <>
      {isLoading ? (
        <CircularProgress color="secondary" className="loader" />
      ) : (
        <form onSubmit={formik.handleSubmit} className="form">
          <h3>Ваш новый продукт</h3>

          {isError && <p className="error--inWindow">{error.message}</p>}

          <TextField
            className="input"
            id="discount"
            name="discount"
            label="Скидка в процентах"
            type="number"
            inputProps={{ min: 0, max: 100 }}
            value={formik.values.discount}
            onChange={formik.handleChange}
            error={formik.touched.discount && Boolean(formik.errors.discount)}
            helperText={formik.touched.discount && formik.errors.discount}
          />

          <TextField
            className="input"
            id="stock"
            name="stock"
            label="Товаров в наличии"
            type="number"
            inputProps={{ min: 0, max: 100 }}
            value={formik.values.stock}
            onChange={formik.handleChange}
            error={formik.touched.stock && Boolean(formik.errors.stock)}
            helperText={formik.touched.stock && formik.errors.stock}
          />
          <TextField
            className="input"
            id="pictures"
            name="pictures"
            label="Ссылка на изображение товара"
            type="text"
            value={formik.values.pictures}
            onChange={formik.handleChange}
            error={formik.touched.pictures && Boolean(formik.errors.pictures)}
            helperText={formik.touched.pictures && formik.errors.pictures}
          />
          <TextField
            className="input"
            id="tags"
            name="tags"
            label="Теги"
            type="text"
            value={formik.values.tags}
            onChange={formik.handleChange}
            error={formik.touched.tags && Boolean(formik.errors.tags)}
            helperText={formik.touched.tags && formik.errors.tags}
          />

          <TextField
            className="input"
            id="name"
            name="name"
            label="Название"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            className="input"
            id="price"
            name="price"
            label="Цена"
            inputProps={{ min: 0 }}
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <TextField
            className="input"
            id="wight"
            name="wight"
            label="Вес"
            type="text"
            value={formik.values.wight}
            onChange={formik.handleChange}
            error={formik.touched.wight && Boolean(formik.errors.wight)}
            helperText={formik.touched.wight && formik.errors.wight}
          />
          <TextField
            className="input"
            id="description"
            name="description"
            label="Описание"
            type="text"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />

          <Button
            color="primary"
            variant="contained"
            type="submit"
            className="btn"
          >
            Добавить
          </Button>
        </form>
      )}
    </>
  );
};
