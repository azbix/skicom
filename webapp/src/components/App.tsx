import * as React from 'react';
import {connect} from 'react-redux';
import {fetchPostsIfNeeded, invalidateMessagesList, sendMessge} from '../actions';
import {NewMessageInput} from './NewMessageInput';
import {Posts} from './Posts';

class App extends React.Component<IAppProps, IAppState> {

//  connection: any;

  constructor(props: IAppProps) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.handleSendTextMessage = this.handleSendTextMessage.bind(this);
  }

  componentDidMount(): void {
    const {dispatch} = this.props;
    dispatch(fetchPostsIfNeeded());

//       // this is an "echo" websocket service for testing pusposes
//       this.connection = new WebSocket('wss://skicom.local:9001');
//       // listen to onmessage event
//       this.connection.onmessage = (evt: any) => {
//         // add the new message to state
//         console.log(evt.data);
//       };
      //
      // // for testing: sending a message to the echo service every 2 seconds,
      // // the service sends it right back
      // setInterval( _ =>{
      //   this.connection.send( Math.random() )
      // }, 2000 );

  }

  handleRefreshClick(e: React.MouseEvent<HTMLAnchorElement>): void {
    e.preventDefault();

    const {dispatch} = this.props;
    dispatch(invalidateMessagesList());
    dispatch(fetchPostsIfNeeded());
  }

  handleSendTextMessage(newMessage: string): void {
    const {dispatch} = this.props;
    dispatch(sendMessge(newMessage));
  }

  render() {
    const {posts, isFetching, lastUpdated} = this.props;
    return (
      <div className="mdl-layout mdl-js-layout">
        <header className="mdl-layout__header">
          head menu
        </header>
        <main className="mdl-layout__content" style={{flex: '1 0 auto'}}>
          <div>
            <p>
              {lastUpdated &&
              <span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}</span>
              }
              {!isFetching &&
              <a href="#" onClick={this.handleRefreshClick}>Refresh</a>
              }
            </p>
            {isFetching && posts.length === 0 &&
            <h2>Loading...</h2>
            }
            {!isFetching && posts.length === 0 &&
            <h2>Empty.</h2>
            }
            {posts.length > 0 &&
            <div style={{ opacity: isFetching ? 0.5 : 1 }}><Posts posts={posts} /></div>
            }
          </div>
        </main>
        <NewMessageInput newMessage="" handleSend={this.handleSendTextMessage} />
      </div>
    );
  }
}

function mapStateToProps(state: IAppState) {
  const {chatMessages} = state;
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = chatMessages.messages || {
    isFetching: true,
    lastUpdated: null,
    items: []
  };
  return {
    posts,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(App);