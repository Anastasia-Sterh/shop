import { Checkbox, Paper } from "@mui/material"
import { useSelector } from "react-redux"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export function CardInCart({ product }) {
    const { count } = useSelector((state => state.productsInCart));
    console.log(product)

    return (
        <Paper className="cart-card" elevation={2}>
            <Checkbox className="cart-card__checkbox" defaultChecked color="secondary" />

            <div className='cart-card__image' style={{ backgroundImage: `url(${product.pictures})` }}></div>
            <span className='cart-card__name'>{product.name}</span>
            <div className="cart-card__count">
                <RemoveIcon className="cart-card__count-button" />
                <input className="cart-card__count-input" value={count}></input>
                <AddIcon className="cart-card__count-button" />

            </div>
            <span className='cart-card__price'>{product.price} ₽</span>
        </Paper>
    )
}