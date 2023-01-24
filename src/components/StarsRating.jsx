import StarIcon from '@mui/icons-material/Star';


export function StarsRating({ rate }) {
    let goldStars = []
    const getGoldStars = () => {
        for (let i = 0; i < rate; i++) {
            goldStars.push(<StarIcon key={i} style={{ color: 'yellow' }} />)
        }
        return goldStars
    }
    let grayStars = []
    let a = getGoldStars();

    const getGrayStars = (goldStars) => {
        for (let i = goldStars.length; i < 5; i++) {
            grayStars.push(<StarIcon key={i} style={{ color: 'gray' }} />)
        }
        return grayStars
    }
    let b = getGrayStars(a)

    const AllStars = (goldStars, grayStars) => {
        let allStars = goldStars.concat(grayStars);
        return allStars
    }

    return (
        AllStars(a, b)

    )
}
