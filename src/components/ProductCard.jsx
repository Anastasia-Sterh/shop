import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { optionalPrice } from '../utils';
import { useDispatch, useSelector } from 'react-redux'
import { addInCart } from '../toolkit/slices/cartSlice';
import { IconButton } from '@mui/material';
import { addInFavorites } from '../toolkit/slices/favoritesSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';


export function ProductCard({ product }) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const ids = useSelector(state => state.favorites)

    const isInFavorites = () => {
        if (ids.includes(product._id)) {
            return true;
        } else {
            return false
        }
    }

    return (

        <Card className='card' sx={{ maxWidth: 345 }} onClick={() => { navigate(`/product/${product._id}`) }}>
            <CardMedia className='card__media'
                sx={{ height: 200 }}
                image={product.pictures}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" component="div">
                    {product.wight} <br />
                    <div className='card__price'>
                        {product.discount == 0 ? (
                            <> {product.price} ₽</>
                        ) : (
                            <>{optionalPrice(product.price, product.discount)} ₽
                                <div className='price--old'> {product.price} ₽ </div>
                            </>
                        )}
                    </div>


                </Typography>
                <div className='card__chip'>
                    {product.tags.map((tag) => <Chip
                        key={tag}
                        size="small"
                        label={tag}
                        style={{ marginLeft: '3px' }}
                        color="secondary"
                    />)}
                </div>
            </CardContent>
            <CardActions className='card__buttons'>
                <Button size="small" variant="contained" onClick={(e) => { e.stopPropagation(); dispatch(addInCart(product._id)) }}>В корзину</Button>

                <IconButton color="primary" onClick={(e) => { e.stopPropagation(); dispatch(addInFavorites(product._id)) }} >
                    {isInFavorites() ? (
                        <FavoriteIcon color="warning" className='card__likes' />
                    ) : (
                        <FavoriteBorderIcon className='card__likes' />
                    )}
                </IconButton>
            </CardActions>
        </Card>
    )
}