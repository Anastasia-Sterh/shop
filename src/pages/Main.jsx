
import { useState, useEffect } from "react";
import { ProductCard } from "../components/ProductCard";
import { getProducts } from "../Api";
import { CircularProgress } from "@mui/material";

export function Main() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
            .then((product) => {
                setProducts(product)
            })
            .catch(err => alert(err))
    }, [])

    if (products.length == 0) {

        return <CircularProgress color="secondary" className="loader" />
    }

    return (
        <div className="main">
            {products.map(product => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    )
}