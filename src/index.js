import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducer.js'
import axios from 'axios'
import './index.css'
import App from './App'

axios.defaults.baseURL = 'https://jackson-blair-node-demon.herokuapp.com/api/';
axios.defaults.withCredentials = true

let updateUserDetailsFromCookie = () => {
	// Update the store with whatever is stored in the cookies 'user' field
	// console.log(document.cookie)

	if (document.cookie.includes("user")) {
		try {
			let userDetails = document.cookie.split("=")[1]
			if (userDetails) { 
				userDetails = JSON.parse(userDetails)
				store.dispatch({ type: "USER_DETAILS_UPDATE", payload: { userDetails: userDetails }})
			} else {
				store.dispatch({ type: "USER_DETAILS_UPDATE", payload: { userDetails: {} }})
				store.dispatch({ type: "BOARDS_UPDATE", payload: { boards: [] }})
			}
		} catch(err) {
			console.log(err)
			store.dispatch({ type: "USER_DETAILS_UPDATE", payload: { userDetails: {} }})
		}
	}
}

axios.interceptors.request.use(request => {
	return request
})

axios.interceptors.response.use(response => {

	console.log(response)
	console.log(response.headers)

	updateUserDetailsFromCookie()
	return response
}, (err) => {

	console.log(err)

	updateUserDetailsFromCookie()
	return Promise.reject(err);
})

const store = createStore(reducer)

// Update user details from cookie as soon as the app loads
updateUserDetailsFromCookie()

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)