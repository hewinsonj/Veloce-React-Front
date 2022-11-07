import React, { useState } from 'react' 
import { redbullCreate } from '../../api/redbull'
import { useNavigate } from 'react-router-dom'

import RedbullForm from '../shared/RedbullForm'
const RedbullCreate = ({ user, msgAlert }) => {
    const navigate = useNavigate()

    const defaultRedbull = {
        flavor: '',
        size: ''
    }

    const [redbull, setRedbull] = useState(defaultRedbull)

    const handleChange = (e) => {
        // to keep the values as users input info 
        // first spread the current pet
        // then comma and modify the key to the value you need
        setRedbull(prevRedbull => {
            const updatedName = e.target.name
            let updatedValue = e.target.value
            // this handles our number type
            if (e.target.type === 'number') {
                // this looks at the input type and changes from the default type of string to an actual number
                updatedValue = parseInt(e.target.value)
            }

            const updatedRedbull = { [updatedName]: updatedValue }

            return { ...prevRedbull, ...updatedRedbull }
        })
    }

    const handleCreateRedbull = (e) => {
        e.preventDefault()
        redbullCreate(redbull, user)
        .then(res => { navigate(`/redbulls/${res.data.redbull._id}`)})
        .then(() => {
            msgAlert({
                heading: 'Success',
                message: 'Create Redbull',
                variant: 'success'
            })
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Create Redbull Failure' + error,
                variant: 'danger'
            })
        })
    }

    return (
			// <>
			// 	<input
			// 		type='text'
			// 		value={redbull.flavor}
			// 		name='flavor'
			// 		onChange={handleChange}
			// 	/>
			// 	<input
			// 		type='text'
			// 		value={redbull.size}
			// 		name='size'
			// 		onChange={handleChange}
			// 	/>
			// 	<button onClick={handleCreateRedbull}>Create a Redbull!</button>
			// </>

            <RedbullForm
            redbull={ redbull }
            handleChange={ handleChange }
            heading="Add a new redbull!"
            handleSubmit={ handleCreateRedbull }
        />

		)
}

export default RedbullCreate