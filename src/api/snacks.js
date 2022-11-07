import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const createSnack = (user, redbullId, newSnack) => {
	return axios({
		url: `${apiUrl}/snacks/${redbullId}`,
		method: 'POST',
		data: { snack: newSnack }
	})
}

// UPDATE snack
export const updateSnack = (user, redbullId, updatedSnack) => {
    console.log('this is updatedSnack', updatedSnack)
	return axios({
		url: `${apiUrl}/snacks/${redbullId}/${updatedSnack._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { snack: updatedSnack }
	})
}

// DELETE snack
export const deleteSnack = (user, redbullId, snackId) => {
	return axios({
		url: `${apiUrl}/snacks/${redbullId}/${snackId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}