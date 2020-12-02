import React, { Component } from 'React'
import './Sidebar.css'

class Sidebar extends Component {
	render() {
		return (
			<div className={`_container-sidebar ${this.props.showingMenu ? "visible" : ""}`}>
				SIDEBAR
			</div>
		)
	}
}

export default Sidebar