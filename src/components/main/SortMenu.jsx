import * as React from 'react';
import { IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SortIcon from '@mui/icons-material/Sort';

export default function SortMenu({ setSortBy, onChange }) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = async () => {
        setAnchorEl(null);
    };


    return (
        <div>
            <IconButton onClick={handleClick}>
                <SortIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => { onChange('sortByAscPrice') }}>По возрастанию цены</MenuItem>
                <MenuItem onClick={() => { onChange('sortByDescPrice') }}>По убыванию цены</MenuItem>
                <MenuItem onClick={() => { onChange('sortByRating') }}>Высокий рейтинг</MenuItem>
                <MenuItem onClick={() => { onChange('sortByAscDisc') }}>По возрастанию скидки</MenuItem>
                <MenuItem onClick={() => { onChange('sortByDescDisc') }}>По убыванию скидки</MenuItem>
            </Menu>
        </div>
    );
}