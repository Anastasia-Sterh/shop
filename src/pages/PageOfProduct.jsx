import { useParams } from "react-router-dom";
import { getOneProduct } from "../api";
import { Button, CircularProgress, Paper } from "@mui/material";
import { getReviewsOneProduct } from "../api";
import { formatDate } from "../utils";
import { StarsRating } from "../components/StarsRating";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Modal } from "../components/Modal";
import { AddReview } from "../components/AddReview";

export function PageOfProduct() {

    const [openModalReview, setOpenModalReview] = useState(false)

    let { productId } = useParams();

    const {
        data: oneProduct,
        isLoading: isLoadingProduct,
        isError: isErrorProduct,
        error: errorProduct,
    } = useQuery({
        queryKey: ['getOneProduct'],
        queryFn: () => getOneProduct(productId)
    });

    const {
        data: review,
        isLoading: isLoadingReviews,
        isError: isErrorReviews,
        error: errorReviews,
        refetch: refetchReviews
    } = useQuery({
        queryKey: ['getReviews'],
        queryFn: () => getReviewsOneProduct(productId)
    })

    if (isLoadingReviews || isLoadingProduct) {
        return <CircularProgress color="secondary" className="loader" />
    }

    if (isErrorReviews) {
        return <p className="error">{errorReviews.message}</p>
    }

    if (isErrorProduct) {
        return <p className="error">{errorProduct.message}</p>
    }

    return (
        <>
            <div className="pageOfProduct">
                <Paper elevation={3} className="pageOfProduct__image">
                    <img src={oneProduct.pictures} alt={oneProduct.name} />
                </Paper>
                <div className="pageOfProduct__infoAboutProduct">

                    <h1>{oneProduct.name}</h1>
                    <h3>{oneProduct.price} ₽</h3>
                    <p>{oneProduct.wight}</p>
                    <p>{oneProduct.description}</p>
                </div>

                <div className="pageOfProduct__infoAboutAuthor">
                    <img src={oneProduct.author.avatar} alt='Avatar' />
                    {oneProduct.author.name}
                </div>
            </div>
            <div className="pageOfProduct__btn">
                <Button size="small" variant="contained" color='secondary' onClick={() => { setOpenModalReview(true) }}> Оставить отзыв</Button>
            </div>
            <div className="pageOfProduct__reviews" >
                {review.map(oneReview =>
                    <div className="pageOfProduct__reviews-oneReview" key={oneReview._id}>
                        <div className="pageOfProduct__reviews-oneReview-top">
                            <div className="pageOfProduct__reviews-oneReview-leftOrRight">
                                <img src={oneReview.author.avatar} alt='Avatar' />
                                {oneReview.author.name}
                            </div>
                            <div className="pageOfProduct__reviews-oneReview-leftOrRight">
                                <div className="date"> {formatDate(oneReview.created_at)} </div>
                                <StarsRating rate={oneReview.rating} /> <br />
                            </div>
                        </div>
                        <div className="pageOfProduct__reviews-oneReview-bottom">
                            {oneReview.text}
                        </div>
                    </div>
                )}

            </div>

            <Modal isOpen={openModalReview} closeModal={() => setOpenModalReview(false)}>
                <AddReview setOpenModalReview={setOpenModalReview} id={productId} refetchReviews={refetchReviews} />
            </Modal>
        </>
    )



}
