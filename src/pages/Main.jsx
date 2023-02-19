import { useQuery } from '@tanstack/react-query'
import { ProductCard } from "../components/ProductCard";
import { CircularProgress } from "@mui/material";
import { useSelector } from 'react-redux';
import { search } from '../api';
import { getSearchSelector } from '../toolkit/slices/searchSlice';


export function Main() {

    const debounceSearch = useSelector(getSearchSelector);

    const { data: resultSearch, isLoading: isLoadingSearch, isError: isErrorSearch, error: errorSearch } = useQuery({
        queryKey: ['search', debounceSearch],
        queryFn: async () => {
            return await search(debounceSearch)

        }
    })

    if (isLoadingSearch) {
        return <CircularProgress color="secondary" className="loader" />
    }

    if (isErrorSearch) {
        return <p className='error'>{errorSearch.message}</p>
    }



    return (
        <div className="main">
            {resultSearch.map(product => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    )
}