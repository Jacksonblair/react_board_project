import React, { Component } from 'React'
import './Header.css'
import HeaderProfileWindow from '../../components/Header/HeaderProfileWindow/HeaderProfileWindow'
import HeaderLogoWindow from '../../components/Header/HeaderLogoWindow/HeaderLogoWindow'
import HeaderBoardAddressWindow from '../../components/Header/HeaderBoardAddressWindow/HeaderBoardAddressWindow'
import HeaderMenuWindow from '../../components/Header/HeaderMenuWindow/HeaderMenuWindow'

class Header extends Component {
	render() {
		return (
			<div className="_container-header">
				<div className="_container-header-center-column">
					<div className="container-header-menu">
						<HeaderLogoWindow/>
						<HeaderBoardAddressWindow/>
						<HeaderProfileWindow/>
						<HeaderMenuWindow clickedMenu={this.props.clickedMenu}/>
					</div>
				</div>
			</div>
		)
	}
}

export default Header