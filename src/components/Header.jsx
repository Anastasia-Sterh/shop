import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import { FirstContext } from "../App";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PetsIcon from '@mui/icons-material/Pets';
import LogoutIcon from '@mui/icons-material/Logout';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
export function Header() {

    const { setIsAuth } = useContext(FirstContext)

    function clearToken() {
        localStorage.removeItem('token');
        setIsAuth(false)
        navigate('/');
        console.log('meow')
    }

    const navigate = useNavigate();


    return (
        <div className="header" >

            <div className="left" onClick={() => { navigate('/main') }}>
                <div className='headerIcons' >
                    <PetsIcon />
                </div>
                <span style={{ cursor: 'pointer' }}>Магазин с конечностями</span>

            </div>
            <div className="search">
                <input name="search" label="Что вы ищете?" type='text' className="searchInput" />
                <SearchIcon className="loopa" />
                {/* <Button variant="contained" color="secondary" className="buttonSearch">Найти</Button> */}
            </div>
            <div className="right">
                <div className='headerIcons' onClick={() => { navigate('/aboutMe') }}>
                    <ShoppingCartIcon />
                    <span>Корзина</span>
                </div>

                <div className='headerIcons' onClick={() => { navigate('/main') }}>
                    <MenuBookIcon />
                    <span>Каталог</span>
                </div>

                <div className='headerIcons' onClick={() => { console.log('testset'); navigate('/aboutMe') }}>
                    <AccountCircleIcon />
                    <span>Профиль</span>
                </div>


                <div className='headerIcons' onClick={() => { clearToken() }}>
                    <LogoutIcon />
                    <span>Выйти</span>
                </div>
            </div>
        </div>
    )
}