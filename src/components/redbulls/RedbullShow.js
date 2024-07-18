import React, { useEffect, useState } from 'react' 
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { redbullDelete, redbullShow } from '../../api/redbull'
// import PetUpdate from './PetUpdate' <--no longer using in lieu of the modal
import EditRedbullModal from './EditRedbullModal'
import NewSnackModal from '../snacks/NewSnackModal'
import ShowSnack from '../snacks/ShowSnack'
import LoadingScreen from '../shared/LoadingScreen'
import { updateRedbullSuccess, updateRedbullFailure } from '../shared/AutoDismissAlert/messages'


const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const RedbullShow = ({ user, msgAlert }) => {

    const [redbull, setRedbull] = useState(null)
    // const [isUpdateShown, setIsUpdateShown] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [snackModalShow, setSnackModalShow] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        redbullShow(user, id)
            .then((res) => {
                setRedbull(res.data.redbull)
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Show Redbull Failure' + error,
                    variant: 'danger'
                })
            })
    }, [updated])

    const handleDeleteRedbull = () => {
        redbullDelete(user, id)
        .then(() => {
            setDeleted(true)
            msgAlert({
                heading: 'Success',
                message: 'Deleting a Redbull',
                variant: 'success'
            })
            
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Deleting a Redbull Failure' + error,
                variant: 'danger'
            })
        })
    }

    let snackCards
    if (redbull) {
        if (redbull.snacks.length > 0) {
            // map over the toys
            // produce one ShowToy component for each of them
            snackCards = redbull.snacks.map(snack => (
                <ShowSnack 
                    key={snack._id}
                    snack={snack}
                    redbull={redbull}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    // logical &&
    // both sides of this check NEED to be truthy values = true
    // logical ||
    // only one side of this check needs to be truthy = true

    // oneliner
    if (deleted) navigate('/redbulls')
    // if (deleted) {
    //     navigate('/pets')
    // }

    if (!redbull) {
        return <LoadingScreen />
    }

    return (
        <>
			<Container className="fluid">
                <Card>
                <Card.Header>Redbull</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <small>Flavor: { redbull.flavor }</small><br/>
                        <small>Type: { redbull.size }</small><br/>
                        <br/>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button onClick={() => setSnackModalShow(true)}
                        className="m-2" variant="info"
                    >
                        Pair a {redbull.flavor} redbull with the wierdest gas station snack you can possibly think of! Yum!
                    </Button>
                    { 
                        redbull.owner && user && redbull.owner._id === user._id 
                        ?
                        <>
                            <Button onClick={() => setEditModalShow(true)} className="m-2" variant="warning">
                                Edit Redbull
                            </Button>
                            <Button onClick={() => handleDeleteRedbull()}
                                className="m-2"
                                variant="danger"
                            >
                                Throw the { redbull.flavor } redbull away
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
                    {/* <h3>Name: {pet.name}</h3>
                    <p>Type: {pet.type}</p>
                    <button onClick={toggleShowUpdate}>Toggle Update</button>
                    {isUpdateShown && (
                        <PetUpdate
                            pet={pet}
                            handleChange={handleChange}
                            handleUpdatePet={handleUpdatePet}
                        />
                    )}
                    <button onClick={handleDeletePet} >Delete</button> */}
                </Card>
            <h3>All paired snacks for the {redbull.flavor} redbull:</h3>
            </Container>
            <Container style={cardContainerLayout}>
                { snackCards }
            </Container>
            <EditRedbullModal 
                user={user}
                redbull={redbull}
                show={editModalShow}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)}
            />
            <NewSnackModal 
                user={user}
                redbull={redbull}
                show={snackModalShow}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setSnackModalShow(false)}
            />
        </>
    )
}

export default RedbullShow