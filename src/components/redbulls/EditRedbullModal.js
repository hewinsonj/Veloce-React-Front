import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import RedbullForm from '../shared/RedbullForm'
import { redbullUpdate } from '../../api/redbull'
import messages from '../shared/AutoDismissAlert/messages'

const EditRedbullModal = (props) => {
    const { 
        user, show, handleClose, 
        msgAlert, triggerRefresh 
    } = props

    const [redbull, setRedbull] = useState(props.redbull)

    const handleChange = (event) => {
        // to keep the values as users input info 
        // first spread the current pet
        // then comma and modify the key to the value you need
        setRedbull({...redbull, [event.target.name]: event.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

    // const updatedRedBull = req.body.redbull.map((drink) => {

    //     const ingredients = drink.ingredients.split(',')
    //     drink.ingredients = ingredients

    //     return drink
    //   })
    
        redbullUpdate(redbull, user, props.redbull._id)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.updateRedbullSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: messages.updateRedbullFailure + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton/>
            <Modal.Body>
                <RedbullForm 
                    redbull={redbull}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Redbull"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditRedbullModal