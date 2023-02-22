import CloseIcon from '@mui/icons-material/Close';
import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { deleteProductFromFavorites } from "../toolkit/slices/favoritesSlice";

export function CardInFavorites({ product }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const products = useSelector((state => state.favorites));

    console.log(products, 'products')

    const deleteOneProduct = () => {
        dispatch(deleteProductFromFavorites(product._id))
    }




    return (
        <Paper className="cart-card" elevation={2} >
            <CloseIcon className='cart-card__icon' onClick={deleteOneProduct} />
            <div className='cart-card__image' style={{ backgroundImage: `url(${product.pictures})` }} onClick={() => { navigate(`/product/${product._id}`) }}></div>
            <span className='cart-card__name' onClick={() => { navigate(`/product/${product._id}`) }}>{product.name}</span>
            <div className="cart-card__count">
            </div>
            <span className='cart-card__price'>{product.price} ₽</span>
            <button>Купить</button>
        </Paper>
    )
}