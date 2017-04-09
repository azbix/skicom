export const REQUEST_POSTS: REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS: RECEIVE_POSTS = 'RECEIVE_POSTS';
export const INVALIDATE_MESSAGES_LIST: INVALIDATE_MESSAGES_LIST = 'INVALIDATE_MESSAGES_LIST';
export const SEND_MESSAGE_COMPLETED: SEND_MESSAGE_COMPLETED = 'SEND_MESSAGE_COMPLETED';
export const APPEND_POST: APPEND_POST = 'APPEND_POST';

export function sendMessge(text: string) {
    return (dispatch: Function) => {
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
                dispatch(sendMessgeCompleted());
// Now handled my mqtt websocket update
//                dispatch(invalidateMessagesList());
//                dispatch(fetchPostsIfNeeded());
            });
    };
}

export function sendMessgeCompleted(): SendMessgeCompletedAction {
    return {
        type: SEND_MESSAGE_COMPLETED
    };
}

export function invalidateMessagesList(): InvalidateMessagesListAction {
    return {
        type: INVALIDATE_MESSAGES_LIST
    };
}

function requestPosts(): RequestPostsAction {
    return {
        type: REQUEST_POSTS
    };
}

function receivePosts(json: Response): ReceivePostsAction {
    return {
        type: RECEIVE_POSTS,
        posts: json,
        receivedAt: Date.now()
    };
}

function fetchPosts(): (dispatch: Function) => void {
    return (dispatch: Function) => {
        dispatch(requestPosts());
        return fetch('http://skicom.local/api/messages')
            .then(req => req.json())
            .then((json: Response) => {
                dispatch(receivePosts(json));
            });
    };
}

export function appendPostFromMqtt(json: string): AppendPostAction {
    let data: IPost = JSON.parse(json);
    return {
        type: APPEND_POST,
        post: data,
        receivedAt: Date.now()
    };
}

function shouldFetchPosts(state: IAppState) {
    const posts = state.chatMessages.messages;
    if (!posts) {
        return true;
    } else if (posts.isFetching) {
        return false;
    } else {
        return posts.didInvalidate;
    }
}

export function fetchPostsIfNeeded() {
    return (dispatch: Function, getState: Function) => {
        if (shouldFetchPosts(getState())) {
            return dispatch(fetchPosts());
        }
    };
}