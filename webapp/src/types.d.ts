interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
}

type REQUEST_POSTS = 'REQUEST_POSTS';
type RequestPostsAction = {
    type: REQUEST_POSTS
}

type RECEIVE_POSTS = 'RECEIVE_POSTS';
type ReceivePostsAction = {
    type: RECEIVE_POSTS,
    posts: Response,
    receivedAt: number
}

type INVALIDATE_MESSAGES_LIST = 'INVALIDATE_MESSAGES_LIST';
type InvalidateMessagesListAction = {
    type: INVALIDATE_MESSAGES_LIST
}

type SEND_MESSAGE_COMPLETED = 'SEND_MESSAGE_COMPLETED';
type SendMessgeCompletedAction = {
    type: SEND_MESSAGE_COMPLETED
}

type OtherAction = { type: '' }

type ChatAction =
    InvalidateMessagesListAction |
    RequestPostsAction |
    ReceivePostsAction |
    OtherAction;

interface IAppProps {
    posts: Array<IPost>;
    isFetching: boolean;
    lastUpdated: string;
    dispatch(action: any): void;
}

interface IAppState {
    chatMessages: IChatMessages;
}

interface IChatMessages {
    messages?: IMessages;
}

interface IMessages {
    isFetching?: false;
    didInvalidate?: false;
    lastUpdated?: string;
    items?: Array<IPost>;
}

interface IPost {
    _id: string;
    author: string;
    text: string;
}

interface IPostsProps {
    posts: Array<IPost>;
}
interface INewMessageInputProps {
    newMessage: string;
    handleSend(newMessage: string): void;
}
interface INewMessageInputState {
    newMessage: string;
}
