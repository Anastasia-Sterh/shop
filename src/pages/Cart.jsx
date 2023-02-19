import { Button, Checkbox, CircularProgress, FormControlLabel, Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux"
import { getManyProducts } from "../api";
import { CardInCart } from "../components/CardInCart";

export function Cart() {
    const cartItems = useSelector(state => state.productsInCart)
    const ids = cartItems.map(item => item.id)

    const { data: products, isLoading, isError, error } = useQuery({
        queryKey: ['getManyProducts'],
        queryFn: () => getManyProducts(ids)
    })

    if (cartItems.length == 0) {
        return <div className="cart">Ваша корзина пуста</div>
    }

    if (isLoading) {
        return <CircularProgress color="secondary" className="loader" />
    }

    if (isError) {
        return <p className="error">{error.message}</p>
    }

    return (
        <>
            <div className="cart">


                <div className="cart__left">
                    <div className="cart__left-top">
                        <div className="cart__left-top-checkbox">
                            <FormControlLabel control={<Checkbox color='secondary' defaultChecked />} label="Выбрать все" />
                        </div>
                        <p className="cart__left-top-p"> Очистить корзину</p>
                    </div>
                    <div className="cart__left-bottom"></div>
                    {products.map(product => (
                        <CardInCart key={product._id} product={product} />
                    ))}
                </div>
                <div className="cart__right">
                    <Paper className="cart__right-info" elevation={2}>
                        <h3> Ваш заказ</h3>
                        <p>Количество товаров в корзине: </p>
                        <p>Стоимость:</p>
                        <p>Скидка:</p>
                        <h3>Итоговая цена:</h3>
                        <Button size="small" variant="contained" color='secondary'>Заказать</Button>
                    </Paper>


                </div>


            </div>
        </>

    )
}