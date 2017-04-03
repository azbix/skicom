export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const INVALIDATE_MESSAGES_LIST = 'INVALIDATE_MESSAGES_LIST'
export const SEND_MESSAGE_COMPLETED = 'SEND_MESSAGE_COMPLETED'

export function sendMessge(text) {
  return dispatch => {
    return fetch(
      'http://skicom.local/api/messages', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: 'IK',
          text: text
        })
      })
      .then(req => req.json())
      .then(json => {
        dispatch(sendMessgeCompleted())
        dispatch(invalidateMessagesList())
        dispatch(fetchPostsIfNeeded())
      })
  }
}

export function sendMessgeCompleted() {
  return {
    type: SEND_MESSAGE_COMPLETED
  }
}

export function invalidateMessagesList() {
  return {
    type: INVALIDATE_MESSAGES_LIST
  }
}

function requestPosts() {
  return {
    type: REQUEST_POSTS
  }
}

function receivePosts(json) {
  return {
    type: RECEIVE_POSTS,
    posts: json,
    receivedAt: Date.now()
  }
}

function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts());
    return fetch('http://skicom.local/api/messages')
      .then(req => req.json())
      .then(json => dispatch(receivePosts(json)))
  }
}

function shouldFetchPosts(state) {
  const posts = state.chatMessages['messages'];
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchPosts())
    }
  }
}