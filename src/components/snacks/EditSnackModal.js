import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import SnackForm from '../shared/SnackForm'
import { updateSnack } from '../../api/snacks'
import messages from '../shared/AutoDismissAlert/messages'


const EditSnackModal = (props) => {
    const { 
        user, show, handleClose, 
        msgAlert, triggerRefresh, redbull 
    } = props

    const [snack, setSnack] = useState(props.snack)

    const handleChange = (e) => {
        setSnack(prevSnack => {
            const name = e.target.name
            let value = e.target.value

            // handle the checkbox
            if (name === "isSpicy" && e.target.checked) {
                value = true
            } else if (name === "isSpicy" && !e.target.checked) {
                value = false
            }

            const updatedSnack = { [name]: value }

            return {
                ...prevSnack, ...updatedSnack
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        updateSnack(user, redbull._id, snack)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.updateSnackSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: messages.updateSnackFailure + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton/>
            <Modal.Body>
                <SnackForm 
                    snack={snack}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Pair this redbull with a snack!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditSnackModal