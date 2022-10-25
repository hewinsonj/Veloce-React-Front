import React, { useState } from 'react' 
import { redbullCreate } from '../api/redbull'

const RedbullCreate = ({ user, msgAlert }) => {

    const defaultRedbull = {
        flavor: '',
        size: ''
    }

    const [redbull, setRedbull] = useState(defaultRedbull)

    const handleChange = (event) => {
        // to keep the values as users input info 
        // first spread the current pet
        // then comma and modify the key to the value you need
        setRedbull({...redbull, [event.target.name]: event.target.value})
    }

    const handleCreateRedbull = () => {
        redbullCreate(redbull, user)
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
			<>
				<input
					type='text'
					value={redbull.flavor}
					name='flavor'
					onChange={handleChange}
				/>
				<input
					type='text'
					value={redbull.size}
					name='size'
					onChange={handleChange}
				/>
				<button onClick={handleCreateRedbull}>Create a Redbull!</button>
			</>
		)
}

export default RedbullCreate