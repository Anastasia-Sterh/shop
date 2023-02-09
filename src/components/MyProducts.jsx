import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { deleteProduct } from '../api';
import { EditProduct } from './EditProduct';
import { Modal } from './Modal';


export function MyProducts({ product, refetchMyProducts, editProductModalShown, setEditProductModalShown }) {
    const navigate = useNavigate();

    const id = product._id;

    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            await deleteProduct(id);
            refetchMyProducts();
            console.log('polikarp')
        }
    })


    return (
        <>
            <div className='myProduct__container' onClick={() => { navigate(`/product/${product._id}`) }}>
                <div className='myProduct__content'>
                    <div className='myProduct__content-image' style={{ backgroundImage: `url(${product.pictures})` }}></div>
                    <span className='myProduct__content-span'>{product.name}</span>
                    <span className='myProduct__content-span'>{product.price} ₽</span>
                    <div className='myProduct__content-buttons'>
                        <Button className='myProduct__content-buttons-button' size="small" variant="contained" onClick={(e) => { e.stopPropagation(); setEditProductModalShown(true) }}>Edit</Button>
                        <Button className='myProduct__content-buttons-button' size="small" variant="contained" onClick={async (e) => { e.stopPropagation(); await mutateAsync(id); }}>Delete</Button>
                    </div>
                </div>
            </div>
            <Modal isOpen={editProductModalShown} closeModal={() => setEditProductModalShown(false)} >
                <EditProduct product={product} refetchMyProducts={refetchMyProducts} setEditProductModalShown={setEditProductModalShown} />
            </Modal>
        </>
    )
}