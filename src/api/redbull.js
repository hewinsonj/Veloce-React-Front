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