import React from 'react'

const RedbullUpdate = ({ redbull, handleChange, handleUpdateRedbull}) => {
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
			<button onClick={handleUpdateRedbull}>Update Redbull</button>
		</>
	)
}

export default RedbullUpdate