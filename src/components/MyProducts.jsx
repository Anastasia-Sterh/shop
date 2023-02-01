import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';




export function MyProducts({ product }) {
    const navigate = useNavigate();

    return (

        <div className='myProduct__container' onClick={() => { navigate(`/product/${product._id}`) }}>
            <div className='myProduct__content'>
                <div className='myProduct__content-image' style={{ backgroundImage: `url(${product.pictures})` }}></div>
                <span className='myProduct__content-span'>{product.name}</span>
                <span className='myProduct__content-span'>{product.price} ₽</span>
                <div className='myProduct__content-buttons'>
                    <Button className='myProduct__content-buttons-button' size="small" variant="contained" onClick={(e) => { e.stopPropagation(); }}>Edit</Button>
                    <Button className='myProduct__content-buttons-button' size="small" variant="contained" onClick={(e) => { e.stopPropagation(); }}>Delete</Button>
                </div>
            </div>
        </div>

    )
}