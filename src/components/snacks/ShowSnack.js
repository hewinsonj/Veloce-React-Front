import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { deleteSnack } from '../../api/snacks'
import EditSnackModal from './EditSnackModal'

const ShowSnack = (props) => {
    const { snack, redbull, user, msgAlert, triggerRefresh } = props
    console.log('this is the props', props)

    const [editModalShow, setEditModalShow] = useState(false)

    // this will set the color of the card based on the condition
    const setBgCondition = (cond) => {
        if (cond === 'crunchy') {
            return({ width: '18rem', backgroundColor: '#b5ead7'})
        } else if (cond === 'chewy') {
            return({ width: '18rem', backgroundColor: '#ffdac1'})
        } else {
            return({ width: '18rem', backgroundColor: '#ff9aa2'})
        }
    }

    // this function removes a toy, is only available to pet owner
    const destroySnack = () => {
        deleteSnack(user, redbull._id, snack._id)
            .then(() => {
                msgAlert({
                    heading: 'Snack deleted!',
                    message: 'Aloha snackola!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className="m-2" style={setBgCondition(snack.type)}>
                <Card.Header>{ snack.name }</Card.Header>
                <Card.Body>
                    <small>{ snack.description }</small><br/>
                    <small>
                        { snack.isSpicy ? 'its soooo hot!' : 'not even kinda spicy, lame'}
                    </small><br/>
                    <small>Texture: { snack.type }</small>
                </Card.Body>
                <Card.Footer>
                    { 
                        user && redbull.owner && user._id === redbull.owner._id 
                        ?
                        <>
                            <Button
                                className="m-2" 
                                variant="warning"
                                onClick={() => setEditModalShow(true)}  
                            >
                                Edit Snack
                            </Button>
                            <Button 
                                className="m-2"
                                variant="danger"
                                onClick={() => destroySnack()}
                            >
                                Delete Snack
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditSnackModal 
                user={user}
                redbull={redbull}
                snack={snack}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
            />
        </>
    )
}

export default ShowSnack