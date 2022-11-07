import apiUrl from '../apiConfig'
import axios from 'axios'

export const redbullCreate = (data, user) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/redbulls',
		data: {
			redbull: data,
		},
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const redbullIndex = (user) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/redbulls',
	})
}

export const redbullShow = (user, id) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/redbulls/' + id
	})
}

export const redbullUpdate = (data, user, id) => {
	return axios({
		method: 'PATCH',
		url: apiUrl + '/redbulls/' + id,
		data: {
			redbull: data,
		},
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const redbullDelete = ( user, id) => {
	return axios({
		method: 'DELETE',
		url: apiUrl + '/redbulls/' + id,
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}