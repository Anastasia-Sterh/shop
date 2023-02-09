import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { optionalPrice } from '../utils';

export function ProductCard({ product }) {
    const navigate = useNavigate()



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
                        {product.discount == 0 || product.discount == 100 ? (
                            <> {product.price} ₽</>
                        ) : (
                            <>{optionalPrice(product.price, product.discount)} ₽
                                <div className='card__price--old'> {product.price} ₽ </div>
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
                <Button size="small" variant="contained" onClick={(e) => { e.stopPropagation(); }}>В корзину</Button>
                <FavoriteIcon className='card__likes' onClick={(e) => { e.stopPropagation(); }} /> {product.likes.length}
            </CardActions>
        </Card>
    )
}