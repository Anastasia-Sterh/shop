import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import { FirstContext } from "../App";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PetsIcon from '@mui/icons-material/Pets';
import LogoutIcon from '@mui/icons-material/Logout';

import { Link, NavLink } from 'react-router-dom';
import { Search } from "./Search";


export function Header() {

    const { refetchAuth } = useContext(FirstContext)

    function clearToken() {
        localStorage.removeItem('token');
        refetchAuth()
        navigate('/signin');

    }

    const navigate = useNavigate();

    return (
        <div className="header" >
            <Link to="/main" className="header__left">
                <div className='header_icons' >
                    <PetsIcon />
                </div>
                <span>Магазин с конечностями</span>

            </Link>

            <Search />

            <div className="header__right">
                <NavLink
                    to="" className='header__icons'>
                    <ShoppingCartIcon />
                    <span>Корзина</span>
                </NavLink>

                <NavLink
                    to="/main" className='header__icons'>
                    <MenuBookIcon />
                    <span>Каталог</span>

                </NavLink>
                <NavLink
                    to="/aboutme" className='header__icons' >
                    <AccountCircleIcon />
                    <span>Профиль</span>

                </NavLink>


                <div className='header__icons' onClick={() => { clearToken() }}>
                    <LogoutIcon />
                    <span>Выйти</span>
                </div>
            </div>
        </div>
    )
}