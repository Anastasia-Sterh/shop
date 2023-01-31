import ReactDOM from 'react-dom'
import { useEffect } from 'react'
import { Paper } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

function ModalContent({ children, closeModal }) {
    useEffect(() => {
        const listner = (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        }

        document.addEventListener('keydown', listner)

        return () => {
            document.removeEventListener('keydown', listner)
        }
    }, [closeModal])


    return (
        <div className='allScreen' onClick={() => closeModal(false)}>
            <Paper className='modal__container' elevation={3} onClick={(e) => e.stopPropagation()}>
                <CloseIcon className='icon' onClick={() => { closeModal(false) }} />
                {children}

            </Paper>
        </div >
    )
}

export function Modal({ children, isOpen = false, closeModal }) {
    if (!isOpen) return null;

    const handleClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal()
        }
    }

    return ReactDOM.createPortal(
        <div onClick={handleClick} >
            <ModalContent closeModal={closeModal}>
                {children}
            </ModalContent>
        </div>,
        document.getElementById('modal-root'))
}




// {/* Модалки из Material UI:
//       <Modal isOpen={isMyModalShown} onClose={() => setIsMyModalShown(false)}>
//         tut soderzhimoe modalki
//       </Modal> */}


// {/* На порталах:

//       <Modal isOpen={isMyModalShown} closeModal={() => setIsMyModalShown(false)}>
//         tut soderzhimoe modalki
//       </Modal>   */}