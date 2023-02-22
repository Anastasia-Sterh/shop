import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getManyProducts } from "../api";
import { CardInFavorites } from "../components/CardInFavorites";


export function Favorites() {
    const favoriteItems = useSelector(state => state.favorites)

    console.log(favoriteItems, 'items')

    // const products = [];
    const { data: products, isLoading, isError, error } = useQuery({
        queryKey: ['getManyProducts', favoriteItems],
        queryFn: () => getManyProducts(favoriteItems)
    })

    console.log(products, 'lo')

    if (isLoading) {
        return <CircularProgress color="secondary" className="loader" />
    }

    if (isError) {
        return <p className="error">{error.message}</p>
    }

    return (



        <div className="favorites">
            {products.map(product => (
                <CardInFavorites key={product._id} product={product} />
            ))}</div>
    )
}