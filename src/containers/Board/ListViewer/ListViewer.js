import React, { Component } from 'React'
import { connect } from 'react-redux'
import * as actionTypes from '../../../store/actions.js'
import './ListViewer.css'
import {
	Link
} from "react-router-dom";
import FuzzySearch from 'fuzzy-search'

import ListPost from '../../../components/Body/ListPost/ListPost'
import ListViewerMenu from '../../../components/Body/ListViewerMenu/ListViewerMenu'

class ListViewer extends Component {

	state = {

	}

	updateStartDateHandler = () => {
		this.props.updateRangeType(1)
	}

	updateEndDateHandler = () => {
		this.props.updateRangeType(2)
	}

	clearFilterHandler = () => {
		this.props.updateRangeStart(null)
		this.props.updateRangeEnd(null)
	}

	clickedPostHandler = (postIndex) => {
		this.props.updatePostToView(this.props.posts[postIndex])
	}

	getFilteredPosts = () => {
		/*
			New start range date ?
				- Earlier than current ?
					- Need to make a new request
				- later than current?
					- Later than current end range ?
						- Need to make a new request
					- Earlier than current end range?
						- Can filter from what we already have

			New end range date ? 
				- Later than current ?
					- Need to make a new request
				- Earlier than current ?
					- Earlier than current start range ?
						- Need to make a new request
					- Later than current start range ?
						- Can filter from what we have

			These rules are only for filtering on a single board, which is how i'll..
			.. keep it for the time being. 
		
			NOTE: When we load the board, we'll get all the posts anyway, so this..
			.. might not be useful until i implement optimizations. 

			TODO: Implement optimizations
		*/

		let filteredPosts = []

		// Filter by date first
		this.props.posts.forEach((post, i) => {
			let canAdd = true // If post passes filter
			let [ dd, mm, yyyy ] = post.date.split('/') /* String date "30/07/1994" */
			let postDate = new Date(parseInt(yyyy), parseInt(mm - 1), parseInt(dd))

			if (this.props.dateRangeStart) {
				// If post date predates our range start date
				if (postDate < this.props.dateRangeStart)
					canAdd = false 
			}

			if (this.props.dateRangeEnd) {
				// If post date postdates our range end date
				if (postDate > this.props.dateRangeEnd)
					canAdd = false
			}

			// Record the posts' index from the unfiltered array..
			// .. so we can select from it later without iterating through it

			if (canAdd) {
				post.index = i
				filteredPosts.push(post)
			}

		})

		/* Filter by fuzzysearch */
		const searcher = new FuzzySearch(filteredPosts, ['title', 'content'], {
		  caseSensitive: false,
		});

		filteredPosts = searcher.search(this.props.searchTerm);

		return filteredPosts;
	}

	render() {
		
		let filteredPosts = this.getFilteredPosts()
		let posts = filteredPosts.map((post, i) => {
			return (
				<Link key={`post-${i}-link`} to={`/board/${this.props.boardToView.id}/post/${post.id}`}>
					<ListPost clicked={() => this.clickedPostHandler(i)} post={post} key={`post-${i}`}/>
				</Link>
			)
		})

		return (
			<div className="container-list-viewer">
				<ListViewerMenu 
					updateSearchTerm={this.props.updateSearchTerm}
					searchTerm={this.props.searchTerm}
					dateRanges={[this.props.dateRangeStart, this.props.dateRangeEnd]}
					clickedUpdateStartDate={this.updateStartDateHandler}
					clickedUpdateEndDate={this.updateEndDateHandler}
					clickedClearFilter={this.clearFilterHandler}/>
				<Link to={`/board/${this.props.boardToView.id}/post/new`}>
				<div
					onClick={this.props.clickedNewPost} 
					className="list-viewer-new-post-button color-5"> 
					<i className="fas fa-plus"></i>&nbsp;ADD NEW POST
				</div>
				</Link>
				{posts}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		month: state.month,
		year: state.year,
		posts: state.posts,
		boardToView: state.boardToView,
		dateRangeStart: state.dateRangeStart,
		dateRangeEnd: state.dateRangeEnd,
		searchTerm: state.searchTerm
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updatePostToView: (post) => dispatch({ type: actionTypes.POST_TO_VIEW_UPDATE, payload: { post: post }}),
		updateRangeStart: (rangeStart) => dispatch({ type: actionTypes.RANGE_START_UPDATE, payload: { rangeStart: rangeStart }  }), 
		updateRangeEnd: (rangeEnd) => dispatch({ type: actionTypes.RANGE_END_UPDATE, payload: { rangeEnd: rangeEnd } }), 
		updateRangeType: (rangeType) => dispatch({ type: actionTypes.DATE_RANGE_TYPE_UPDATE, payload: { rangeType: rangeType }  }), 
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(ListViewer)
