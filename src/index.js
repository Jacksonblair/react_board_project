import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducer.js'
import axios from 'axios'

import './index.css'
import App from './App'

axios.defaults.baseURL = 'http://localhost:4555/api';
axios.defaults.withCredentials = true

axios.interceptors.request.use(request => {
	console.log('Starting Request', JSON.stringify(request, null, 2))
	return request
})

axios.interceptors.response.use(response => {
	/* TODO: 
		If response has a JWT in the cookies,
		tell the store we're authed
		and store the user details in the store
	*/
	return response
})


// Authorization: Bearer <JWT goes here>

const store = createStore(reducer)

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)