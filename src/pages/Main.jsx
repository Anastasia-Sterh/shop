import { useQuery } from '@tanstack/react-query'
import { ProductCard } from "../components/main/ProductCard";
import { CircularProgress } from "@mui/material";
import { useSelector } from 'react-redux';
import { search } from '../api';
import { getSearchSelector } from '../toolkit/slices/searchSlice';
import SortMenu from '../components/main/SortMenu';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';



export function Main() {
    const [searchParams] = useSearchParams();
    const firstSort = searchParams.get('sort');
    const [sortBy, setSortBy] = useState(firstSort ? firstSort : '')
    const debounceSearch = useSelector(getSearchSelector);
    const navigate = useNavigate();

    const { data: resultSearch, isLoading: isLoadingSearch, isError: isErrorSearch, error: errorSearch } = useQuery({
        queryKey: ['search', debounceSearch, sortBy],
        queryFn: async () => {
            return await search(debounceSearch, sortBy)

        }
    })


    useEffect(() => {
        if (sortBy != '' && firstSort == null) {
            setSortBy('')
        }
    }, [sortBy, firstSort])

    const onChange = (value) => {
        setSortBy(value)
        if (value) {

            navigate({
                pathname: '/main',
                search: `?sort=${value}`,
            });
        } else {
            setSortBy('')
            navigate('/main');
        }

    }

    if (isLoadingSearch) {
        return <CircularProgress color="secondary" className="loader" />
    }

    if (isErrorSearch) {
        return <p className='error'>{errorSearch.message}</p>
    }
    if (resultSearch.length == 0) {
        return <p className='error'>Простите, по вашему запросу ничего не найдено.</p>
    }

    return (
        <div className='main'>
            <div className='main__sort' >

                <SortMenu setSortBy={setSortBy} onChange={onChange} sortBy={sortBy} />

            </div>
            <div className="main__products">
                {resultSearch.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
}