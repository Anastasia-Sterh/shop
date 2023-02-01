import { useQuery } from '@tanstack/react-query'
import { ProductCard } from "../components/ProductCard";
import { getProducts } from "../api";
import { CircularProgress } from "@mui/material";

export function Main() {

    const { data: products, isLoading, isError, error } = useQuery({
        queryKey: ['getProduct'],
        queryFn: () => getProducts()
    })

    if (isLoading) {
        return <CircularProgress color="secondary" className="loader" />
    }

    if (isError) {
        return <p className='error'>{error.message}</p>
    }

    return (
        <div className="main">
            {products.map(product => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    )
}