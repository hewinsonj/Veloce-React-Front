import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import SnackForm from '../shared/SnackForm'
import { createSnack } from '../../api/snacks'

const NewSnackModal = (props) => {
    const { 
        user, redbull, show, handleClose, msgAlert, triggerRefresh
    } = props

    const [snack, setSnack] = useState({})

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

        createSnack(user, redbull._id, snack)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh yeah!',
                    message: 'This goes great with a Redbull!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch((error) => {
                console.log(snack)
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong! Please try again'+ error,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={ show } onHide={ handleClose }>
            <Modal.Header closeButton />
            <Modal.Body>
                <SnackForm 
                    snack={snack}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Pair a snack with that Redbull!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewSnackModal