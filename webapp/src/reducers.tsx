import {combineReducers} from 'redux';
import {INVALIDATE_MESSAGES_LIST, REQUEST_POSTS, RECEIVE_POSTS, APPEND_POST} from './actions';

function posts(state: IMessages = {isFetching: false, didInvalidate: false, items: []}, action: ChatAction): IMessages {
    switch (action.type) {
        case INVALIDATE_MESSAGES_LIST:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            });
        case APPEND_POST:
            let items = state.items || [];
//            updatedItems.push(action.post);
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: [...items, action.post],
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
}

function chatMessages(state: IChatMessages = {}, action: ChatAction): IChatMessages {
    switch (action.type) {
        case INVALIDATE_MESSAGES_LIST:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
        case APPEND_POST:
            return Object.assign({}, state, {
                messages: posts(state.messages, action)
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    chatMessages
});

export default rootReducer;