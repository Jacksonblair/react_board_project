import React, { Component } from 'React'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions.js'
import './Board.css'
import {
	Switch,
	Route,
	Link,
	withRouter,
	Redirect
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion"

import CalendarViewer from './CalendarViewer/CalendarViewer.js'
import ListViewer from './ListViewer/ListViewer.js'
import PostViewer from './PostViewer/PostViewer.js'
import PostEditor from './PostEditor/PostEditor'
import BoardEditor from './BoardEditor/BoardEditor'

import CSSTransition from '../Util/CSSTransition/CSSTransition'
import BoardMenu from '../../components/Body/BoardMenu/BoardMenu'
import PostCreator from '../../components/Body/PostCreator/PostCreator'


class Board extends Component {

	state = {
		finishedLoading: false,
		boardFormat: 0, /* 0: Calendar, 1: List*/
		searchTerm: ""
	}

	componentDidMount = () => {
		/* Get this board AND posts on mount */

		setTimeout(() => {
			this.props.updateBoardToView(
			{
				id: 0,
				name: "Board name 1",
			})
			this.props.updatePosts([
				{
					id: 0,
					boardId: 0,
					title: "Post title 1",
					content: "Blah blah blah blah",
					date: "01/02/2020",
					time: 1000
				},
				{
					id: 1,
					boardId: 0,
					title: "Post title 2",
					content: "Blah blah blah blah",
					date: "03/02/2020",
					time: null
				}
			])

			this.setState({
				finishedLoading: true
			})
		}, 300)
	}

	getInterface = (index) => {
		if (index == 0) 
			return ( <CalendarViewer/> )
		if (index == 1)
			return ( <ListViewer/> )
		if (index == 2)
			return ( <BoardEditor board={this.props.boardToView}/> )		
		if (index == 3)
			return ( <PostViewer/> )	
		if (index == 4)
			return ( <PostCreator/> )
		if (index == 5)
			return ( <PostEditor/> )
	}

	render() {

		return (
			<React.Fragment>
				<BoardMenu 
				searchTerm={this.props.searchTerm}
				updateSearchTerm={this.props.updateSearchTerm}
				loaded={this.state.finishedLoading} 
				board={this.props.boardToView}/>
				<AnimatePresence location={this.props.location} key={this.props.location.pathname}>
					<Switch>	
						<Route key="rt-1" exact path="/board/:boardid/post/:postid/edit">	
							<motion.div initial="initial" animate="in" exit="out" variants={this.props.pageVariants}>
								{ this.state.finishedLoading ? this.getInterface(5) : "LOADING" }
							</motion.div>
						</Route> 	
						<Route path="/board/:boardid/post/new">	
							<motion.div initial="initial" animate="in" exit="out" variants={this.props.pageVariants}>
							{ this.state.finishedLoading ? this.getInterface(4) : "LOADING" }			
							</motion.div>
						</Route> 		
						<Route path="/board/:boardid/post/:postid">	
							<motion.div className="motion-div" initial="initial" animate="in" exit="out" variants={this.props.pageVariants}>
							{ this.state.finishedLoading ? this.getInterface(3) : "LOADING" }			
							</motion.div>
						</Route> 	
						<Route exact path="/board/:boardid/edit">	
							<motion.div initial="initial" animate="in" exit="out" variants={this.props.pageVariants}>
							{ this.state.finishedLoading ? this.getInterface(2) : "LOADING" }			
							</motion.div>
						</Route> 
						<Route exact path="/board/:boardid/list">	
							<motion.div className="motion-div" initial="initial" animate="in" exit="out" variants={this.props.pageVariants}>
							{ this.state.finishedLoading ? this.getInterface(1) : "LOADING" }	
							</motion.div>
						</Route> 	
						<Route exact path="/board/:boardid/calendar">	
							<motion.div initial="initial" animate="in" exit="out" variants={this.props.pageVariants}>
							{ this.state.finishedLoading ? this.getInterface(0) : "LOADING" }	
							</motion.div>
						</Route> 	
						<Route path="/board/:boardid/">
							<Redirect to={`${this.props.location.pathname}/list`}/>
						</Route>
					</Switch>
				</AnimatePresence>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		pageVariants: state.pageVariants,
		boards: state.boards,
		boardToView: state.boardToView,
		posts: state.posts,
		postToView: state.postToView,
		searchTerm: state.searchTerm
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateSearchTerm: (searchTerm) => dispatch({ type: actionTypes.SEARCH_TERM_UPDATE, payload: { searchTerm: searchTerm }}),
		updateBoardToView: (boardToView) => dispatch({ type: actionTypes.BOARD_TO_VIEW_UPDATE, payload: { boardToView: boardToView }}),
		updatePosts: (posts) => dispatch({ type: actionTypes.POSTS_UPDATE, payload: { posts: posts }}),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board))