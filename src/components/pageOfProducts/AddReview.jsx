// import { StarsRating } from "./StarsRating"
import { useFormik } from "formik";
import * as Yup from "yup";
import { addReview } from "../../api";
import { useMutation } from "@tanstack/react-query";
import { Button, CircularProgress, TextField } from "@mui/material";

export function AddReview({ setOpenModalReview, id, refetchReviews }) {
  const validateSchema = Yup.object({
    text: Yup.string().required("Введите текст отзыва"),
    rating: Yup.number()
      .min(1, "Оценка не может быть ниже одного")
      .max(5, "Оценка не может быть выше пятерки")
      .required("Оцените товар"),
  });

  const { mutateAsync, isError, error, isLoading } = useMutation({
    mutationFn: async (value) => await addReview(value),
  });

  const formik = useFormik({
    initialValues: {
      rating: 1,
      text: "",
    },
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      let value = {};
      value.id = id;
      value.values = values;
      await mutateAsync(value);
      refetchReviews();
      setOpenModalReview(false);
    },
  });

  return (
    <>
      {isLoading ? (
        <CircularProgress color="secondary" className="loader" />
      ) : (
        <form onSubmit={formik.handleSubmit} className="form">
          <p>Оставьте отзыв на этот товар</p>

          {isError && <p className="error--inWindow">{error.message}</p>}

          <TextField
            className="input"
            id="rating"
            name="rating"
            label="Оценка"
            type="number"
            inputProps={{ min: 1, max: 5 }}
            value={formik.values.rating}
            onChange={formik.handleChange}
            error={formik.touched.rating && Boolean(formik.errors.rating)}
            helperText={formik.touched.rating && formik.errors.rating}
            min={0}
          />
          <TextField
            className="input"
            id="text"
            name="text"
            label="Текст отзыва"
            type="text"
            value={formik.values.text}
            onChange={formik.handleChange}
            error={formik.touched.text && Boolean(formik.errors.text)}
            helperText={formik.touched.text && formik.errors.text}
          />
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            className="btn"
          >
            Добавить отзыв
          </Button>
        </form>
      )}
    </>
  );
}
