import { Checkbox, IconButton, Paper } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { changeCount, deleteProductInCart } from "../toolkit/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { toggleCheckbox } from "../toolkit/slices/haveCheckboxSlice";

export function CardInCart({ product }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const products = useSelector((state => state.productsInCart));
    const haveCheckbox = useSelector((state => state.haveCheckbox))

    const counter = () => {
        let count = 0;
        for (let position of products) {
            if (position.id == product._id) {
                count = position.count;
            }
        }
        return count;
    }

    const count = counter()

    const deleteOneProduct = () => {
        dispatch(deleteProductInCart(product._id))
    }

    const checked = () => {
        if (haveCheckbox.includes(product._id)) {
            return true
        } else {
            return false
        }

    }

    return (
        <Paper className="cart-card" elevation={2} >
            <CloseIcon className='cart-card__icon' onClick={deleteOneProduct} />
            <Checkbox className="cart-card__checkbox" color="secondary" checked={checked()} onChange={() => dispatch(toggleCheckbox(product._id))} />

            <div className='cart-card__image' style={{ backgroundImage: `url(${product.pictures})` }} onClick={() => { navigate(`/product/${product._id}`) }}></div>
            <span className='cart-card__name' onClick={() => { navigate(`/product/${product._id}`) }}>{product.name}</span>
            <div className="cart-card__count">

                <IconButton disabled={count <= 1} color='default' onClick={() => { dispatch(changeCount({ id: product._id, value: count - 1 })) }}>
                    <RemoveIcon />
                </IconButton>

                <div className="cart-card__count-div">
                    {count}
                </div>

                <IconButton disabled={count >= product.stock} color="default" onClick={() => { dispatch(changeCount({ id: product._id, value: count + 1 })) }}>
                    <AddIcon />
                </IconButton>

            </div>
            <span className='cart-card__price'>{product.price} ₽</span>
        </Paper>
    )
}