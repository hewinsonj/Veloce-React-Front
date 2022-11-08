let apiUrl
const apiUrls = {
    // YOU MUST CHANGE PRODUCTION URL WHEN DEPLOYING
	production: 'https://darling-semifreddo-2f057a.netlify.app',
	development: 'http://localhost:8000',
}

if (window.location.hostname === 'localhost') {
	apiUrl = apiUrls.development
} else {
	apiUrl = apiUrls.production
}

export default apiUrl
