import { CircularProgress } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { EditUserModal } from "../components/EditUserModal";
import { getMe } from "../api";
import { AddProduct } from "../components/AddProduct";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "../components/Modal";
import { EditUserAvatarModal } from "../components/EditUserAvatarModal";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { getMyProducts } from "../api";
import { MyProducts } from "../components/MyProducts";


export function AboutMe() {

    const [editModalShown, setEditModalShown] = useState(false)
    const [addModalShown, setAddModalShown] = useState(false)
    const [editAvatarModalShown, setEditAvatarModalShown] = useState(false);


    const { data: user, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['getMe'],
        queryFn: () => getMe()
    })

    const { data: products, isLoading: isLoadingMyProducts, isError: isErrorMyProducts, error: errorMyProducts, refetch: refetchMyProducts } = useQuery({
        queryKey: ['getMyProducts'],
        queryFn: () => getMyProducts()

    })

    console.log(products)

    if (isLoading) {
        return <CircularProgress color="secondary" className="loader" />
    }

    if (isError) {
        return <p className="error">{error.message}</p>
    }



    if (isLoadingMyProducts) {
        return <CircularProgress color="secondary" className="loader" />
    }

    if (isErrorMyProducts) {
        return <p className='error'>{errorMyProducts.message}</p>
    }

    const onAddProductClick = () => {
        setAddModalShown(true)
    }

    return (
        <>
            <div className="userWindow">
                <div className="userWindow__content">
                    <div className='userWindow__content-avatar' style={{ backgroundImage: `url(${user.avatar})` }}>
                        <div className="userWindow__content-avatar-overlay" onClick={() => { setEditAvatarModalShown(true) }}>
                            <AddAPhotoIcon style={{ cursor: 'pointer', fontSize: '75px' }} />
                        </div>

                    </div>
                    <h1>{user.name} <EditIcon style={{ cursor: 'pointer' }} onClick={() => { setEditModalShown(true) }} /> </h1>
                    <p> {user.about} </p>
                </div>
            </div>

            <h1>Мои продукты</h1>
            <div className="myProducts">
                <div className="myProducts__add" onClick={() => { onAddProductClick(); }}>
                    <AddIcon style={{ fontSize: '80px', color: 'gray' }} />

                </div>
                {products.map(product => (
                    <MyProducts key={product._id} product={product} refetchMyProducts={refetchMyProducts}
                    />
                ))}
            </div>

            <Modal isOpen={addModalShown} closeModal={() => setAddModalShown(false)}>
                <AddProduct setAddModalShown={setAddModalShown} refetchMyProducts={refetchMyProducts} />
            </Modal>

            <Modal isOpen={editModalShown} closeModal={() => setEditModalShown(false)} >
                <EditUserModal user={user} setEditModalShown={setEditModalShown} refetch={refetch} />
            </Modal>

            <Modal isOpen={editAvatarModalShown} closeModal={() => setEditAvatarModalShown(false)} >
                <EditUserAvatarModal user={user} setEditAvatarModalShown={setEditAvatarModalShown} refetch={refetch} />
            </Modal>


        </>
    )
}