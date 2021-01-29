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

let updateUserDetailsFromHeader = (headers) => {
	// Update the store with whatever is stored in the cookies 'user' field
	// console.log(document.cookie)


	if (headers["x-user"]) {
		let userDetails = JSON.parse(headers["x-user"])
		store.dispatch({ type: "USER_DETAILS_UPDATE", payload: { userDetails: userDetails }})
	} else {
		store.dispatch({ type: "USER_DETAILS_UPDATE", payload: { userDetails: {} }})
		store.dispatch({ type: "BOARDS_UPDATE", payload: { boards: [] }})
	}

}

axios.interceptors.request.use(request => {
	return request
})

axios.interceptors.response.use(response => {
	updateUserDetailsFromHeader(response.headers)
	return response
}, (err) => {
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