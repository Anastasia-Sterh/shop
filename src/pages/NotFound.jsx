import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

export function NotFound() {

    const navigate = useNavigate();
    const onBtnClick = () => {
        return navigate('/main')
    }
    return (
        <div className="NotFound">
            <h1>Простите, но такой страницы нет. Вам придется вернуться туда, откуда вы пришли. </h1> <br />
            <Button variant="contained" color="secondary" onClick={onBtnClick}>Ну тогда я пошел</Button>
        </div>
    )
}