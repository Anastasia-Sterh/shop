import { Button, Checkbox, CircularProgress, FormControlLabel, Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { getManyProducts } from "../api";
import { CardInCart } from "../components/CardInCart";
import { clearCart } from "../toolkit/slices/cartSlice";
import { toggleSelectAll } from "../toolkit/slices/haveCheckboxSlice";

export function Cart() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.productsInCart)
    const haveCheckbox = useSelector(state => state.haveCheckbox)
    const ids = cartItems.map(item => item.id)

    console.log('ids', ids)

    const { data: products, isLoading, isError, error } = useQuery({
        queryKey: ['getManyProducts', ids],
        queryFn: () => getManyProducts(ids)
    })

    if (cartItems.length == 0) {
        return (
            <div className="cart__empty">Ваша корзина пуста
                <Button size="small" variant="contained" color='secondary' className='cart__empty-button' onClick={() => { return navigate('/main') }}>Вернуться к покупкам</Button>
            </div>)
    }


    if (isLoading) {
        return <CircularProgress color="secondary" className="loader" />
    }

    if (isError) {
        return <p className="error">{error.message}</p>
    }

    const checked = () => {

        let isAllProductsChecked = ids.every(function (id) {
            if (haveCheckbox.includes(id)) {
                return true;
            } else {
                return false;
            }
        });
        return isAllProductsChecked;
    }

    const indeterminate = () => {

        if (checked() == true) {
            return
        }

        if (haveCheckbox.length !== 0) {
            return true;
        }
    }



    return (
        <>
            <div className="cart">


                <div className="cart__left">
                    <div className="cart__left-top">
                        <div className="cart__left-top-checkbox" >
                            <FormControlLabel control={<Checkbox color='secondary' checked={checked()} indeterminate={indeterminate()} onChange={() => dispatch(toggleSelectAll(ids))} />} label="Выбрать все" />
                        </div>
                        <p className="cart__left-top-p" onClick={() => { dispatch(clearCart()) }}> Очистить корзину</p>
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