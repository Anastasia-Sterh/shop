import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { CircularProgress } from '@mui/material';
import { search } from "../api";
import { ProductCard } from "../components/ProductCard";

export function SearchResult() {


    let { val } = useParams()


    const { data: products, isLoading, isError, error } = useQuery({
        queryKey: ['search', val],
        queryFn: async () => {
            return await search(val)

        }
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