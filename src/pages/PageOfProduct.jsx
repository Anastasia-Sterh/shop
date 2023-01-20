import { useState } from "react";
import { useParams } from "react-router-dom";
import { getOneProduct } from "../Api";
import { useEffect } from "react";
import { CircularProgress, Paper } from "@mui/material";
import { getReviewsOneProduct } from "../Api";
import { formatDate } from "../utils";
import { StarsRating } from "../components/StarsRating";

export function PageOfProduct() {

    const [oneProduct, setOneProduct] = useState();
    const [review, setReview] = useState();

    let { productId } = useParams();

    useEffect(() => {
        getOneProduct(productId).then((oneProduct) => setOneProduct(oneProduct)).catch(err => alert(err))

        getReviewsOneProduct(productId).then((review) => setReview(review)).catch(err => alert(err))
    }, [])

    if (oneProduct == undefined || review == undefined) {

        return <CircularProgress color="secondary" className="loader" />
    }

    return (
        <>
            <div className="pageOfProduct">
                <Paper elevation={3} className="imageInPageOfProduct">
                    <img src={oneProduct.pictures} alt={oneProduct.name} />
                </Paper>
                <div className="infoAboutProduct">

                    <h1>{oneProduct.name}</h1>
                    <h3>{oneProduct.price} ₽</h3>
                    <p>{oneProduct.wight}</p>
                    <p>{oneProduct.description}</p>
                </div>

                <div className="infoAboutAuthorInPageOfProduct">
                    <img src={oneProduct.author.avatar} alt='Avatar' />
                    {oneProduct.author.name}
                </div>
            </div>
            <div className="reviewInPageOfProduct" >
                {review.map(oneReview =>
                    <div className="oneReview" key={oneReview._id}>
                        <div className="top_oneReview">
                            <div className="right_oneReview">
                                <img src={oneReview.author.avatar} alt='Avatar' />
                                {oneReview.author.name}
                            </div>
                            <div className="left_oneReview">
                                <div className="date"> {formatDate(oneReview.created_at)} </div>
                                <StarsRating rate={oneReview.rating} /> <br />
                            </div>
                        </div>
                        <div className="bottom_oneReview">
                            {oneReview.text}
                        </div>
                    </div>
                )}

            </div>
        </>
    )



}
