
import { useState, useEffect } from "react";
import { ProductCard } from "../components/ProductCard";
import { Header } from "../components/Header";
import { getProducts } from "../Api";

export function Main() {

    const [products, setProducts] = useState([])


    useEffect(() => {
        getProducts()
            .then((product) => {
                setProducts(product)
            })
            .catch(err => alert(err))
    }, [])

    let allCards = [];
    for (const product of products) {
        allCards.push(<ProductCard key={product.id} product={product} />)
    }
    return (
        <>
            <Header />
            <div className="main">
                {allCards}
            </div>
        </>
    )
}