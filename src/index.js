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
	// Update the store with whatever is stored in the x-user header in the response

	console.log(headers)

	if (headers["X-User"]) {
		let userDetails = JSON.parse(headers["X-User"])

		console.log(userDetails)

		if (userDetails.user_id) {
			store.dispatch({ type: "USER_DETAILS_UPDATE", payload: { userDetails: userDetails }})
		} else {
			store.dispatch({ type: "USER_DETAILS_UPDATE", payload: { userDetails: {} }})
			store.dispatch({ type: "BOARDS_UPDATE", payload: { boards: [] }})		
		}
	}
}

axios.interceptors.request.use(request => {
	return request
})

axios.interceptors.response.use(response => {
	updateUserDetailsFromHeader(response.headers)
	return response
}, (err) => {
	updateUserDetailsFromHeader(err.response.headers)
	return Promise.reject(err);
})

const store = createStore(reducer)

// Initialize the app by sending a request to the server, which will check validity of
// .. stored JWT (if there is one), and send back the user details with which we update
// .. the store. Whatever happens, we set hasInit to true
axios.get("/init")
.then((res) => {
	store.dispatch({ type: "HAS_INIT_UPDATE" })
})
.catch((err) => {
	store.dispatch({ type: "HAS_INIT_UPDATE" })
})


const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)