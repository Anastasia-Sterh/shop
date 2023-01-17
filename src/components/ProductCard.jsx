// import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

export function ProductCard({ product }) {

    return (

        <Card className='card' sx={{ maxWidth: 345 }}>
            <CardMedia className='CardMedia'
                sx={{ height: 200 }}
                image={product.pictures}
                title={product.name}

            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.wight} <br />
                    {product.price} ₽

                </Typography>
                <div className='chipInCard'> {product.tags.map((tag) => <Chip
                    key={tag}
                    size="small"

                    label={tag}
                    style={{ marginLeft: '3px' }}
                    color="secondary"
                />)}</div>
            </CardContent>
            <CardActions className='buttonsInCards'>
                <Button size="small" variant="contained">В корзину</Button>
                <Button size="small" variant="contained">Узнать больше</Button>
            </CardActions>
        </Card>

    )
}