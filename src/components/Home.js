import RedbullIndex from "./redbulls/RedbullIndex"
import React, { useState, useEffect } from "react"

const Home = (props) => {
	const { msgAlert } = props
	console.log('props in home', props)

	return (
			<div className='container-md'>
			<h2>All the Redbulls you could ever want</h2>
			< RedbullIndex msgAlert={msgAlert} />

			</div>

	)
}

export default Home
