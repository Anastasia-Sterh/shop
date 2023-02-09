import SearchIcon from '@mui/icons-material/Search';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';



export function Search() {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            search: '',
        },

        onSubmit: async (values, { resetForm }) => {
            let val = values.search
            resetForm();
            return navigate(`/products/search/${val}`)


        }
    });

    return (
        <div className="header__center search">
            <form onSubmit={formik.handleSubmit}>
                <div className='search__container'>
                    <input name="search"
                        label="Что вы ищете?"
                        type='text'
                        className="search__container-input"
                        value={formik.values.search}
                        onChange={formik.handleChange} />
                    <button name='search' className="search__container-button" type='submit'> <SearchIcon /> </button>
                </div>
            </form>
        </div>
    )
}


