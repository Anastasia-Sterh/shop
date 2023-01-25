import { useState, useEffect } from 'react'

export function formatDate(actualDate) {
    let newDate = new Date(actualDate);
    return newDate.toLocaleDateString()

}



export const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(undefined)

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])


    return windowWidth
}


