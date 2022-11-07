import React, { useEffect, useState } from 'react' 
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { redbullIndex } from '../../api/redbull'
import LoadingScreen from '../shared/LoadingScreen'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const RedbullIndex = ({ user, msgAlert }) => {

    const [allRedbulls, setAllRedbulls] = useState([])

    useEffect(() => {
        redbullIndex(user)
        .then(res => {
            setAllRedbulls(res.data.redbulls)
            console.log(res.data.redbulls)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Index Redbulls Failure' + error,
                variant: 'danger'
            })
        })
    }, [])

    const redbullCards = allRedbulls.map(redbull => (
        <Card key={ redbull._id } style={{ width: '30%', margin: 5 }}>
            <Card.Header> {redbull.flavor} </Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={ `/redbulls/${redbull._id}` }>View { redbull.name }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    if (!allRedbulls) {
        return <LoadingScreen />
    }

    return (
        <div className='container-md' style={ cardContainerLayout }>
            { redbullCards }
        </div>
    )
}

export default RedbullIndex