import CloseIcon from '@mui/icons-material/Close';
import { Button, Paper } from "@mui/material";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { addInCart } from '../toolkit/slices/cartSlice';
import { deleteProductFromFavorites } from "../toolkit/slices/favoritesSlice";

export function CardInFavorites({ product }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const products = useSelector((state => state.favorites));

    const deleteOneProduct = () => {
        dispatch(deleteProductFromFavorites(product._id))
    }




    return (
        <>

            <Paper className="cart-card" style={{ margin: '15px' }} elevation={2} >
                <CloseIcon className='cart-card__icon' onClick={deleteOneProduct} />
                <div className='cart-card__image' style={{ backgroundImage: `url(${product.pictures})` }} onClick={() => { navigate(`/product/${product._id}`) }}></div>
                <span className='cart-card__name' onClick={() => { navigate(`/product/${product._id}`) }}>{product.name}</span>
                <div className="cart-card__count">
                </div>
                <span className='cart-card__price'>{product.price} ₽</span>
                <Button size="small" variant="contained" color='secondary' onClick={() => { dispatch(addInCart(product._id)) }} style={{ margin: '15px' }}>Добавить в корзину</Button>
            </Paper>
        </>
    )
}