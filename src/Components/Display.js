import '../App.css';
import '../Styles/Popup.css';
import { useEffect, useState } from 'react';

function Display({ isAdded }) {
    const [show, setShow] = useState(true)
    console.log(isAdded)
    useEffect(() => {
        const timeId = setTimeout(() => {
            setShow(false)
        }, 3000)

        return () => {
            clearTimeout(timeId)
        }
    }, []);
    return (
        show &&
        <div className='popup'>
            {isAdded ? "Added to" : "Removed from"} wishlist
        </div>
    )
}

export default Display;