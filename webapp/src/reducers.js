import { combineReducers } from 'redux'
import { INVALIDATE_REDDIT, REQUEST_POSTS, RECEIVE_POSTS } from './actions'

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case INVALIDATE_REDDIT:
    return Object.assign({}, state, {
      didInvalidate: true
    })
  case REQUEST_POSTS:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    })
  case RECEIVE_POSTS:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      items: action.posts,
      lastUpdated: action.receivedAt
    })
  default:
    return state
  }
}

function postsByReddit(state = { }, action) {
  switch (action.type) {
  case INVALIDATE_REDDIT:
  case RECEIVE_POSTS:
  case REQUEST_POSTS:
    return Object.assign({}, state, {
      reactjs: posts(state['reactjs'], action)
    })
  default:
    return state
  }
}

const rootReducer = combineReducers({
  postsByReddit
})

export default rootReducer