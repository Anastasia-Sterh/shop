import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useDebounce } from './useDebounce';
import { changeSearch } from '../toolkit/slices/searchSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export function Search() {
    const [searchInput, setSearchInput] = useState('')
    const dispatch = useDispatch();
    const debounceValue = useDebounce(searchInput, 1000)
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (debounceValue != '' && pathname != '/main') {
            navigate('/main');
        }

        dispatch(changeSearch(debounceValue))
    }, [dispatch, debounceValue])

    return (
        <div className="header__center search">

            <div className='search__container'>
                <input name="search"
                    label="Что вы ищете?"
                    type='text'
                    className="search__container-input"
                    value={searchInput}
                    onChange={(ev) => setSearchInput(ev.target.value)}
                />
                <div className="search__container-button" type='submit'> <SearchIcon /> </div>
            </div>

        </div>
    )
}


