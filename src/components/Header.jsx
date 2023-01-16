import { useNavigate } from "react-router-dom"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PetsIcon from '@mui/icons-material/Pets';

export function Header() {

    const navigate = useNavigate();

    return (
        <div className="header">

            <div className="left">
                <div className='headerIcons' onClick={() => { navigate('/main') }}>
                    <PetsIcon />
                </div>
                <span>Магазин с конечностями</span>

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

                <div className='headerIcons' onClick={() => { navigate('/aboutMe') }}>
                    <AccountCircleIcon />
                    <span>Профиль</span>
                </div>
            </div>
        </div>
    )
}