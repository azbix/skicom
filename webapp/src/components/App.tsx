import * as React from 'react';
import {connect} from 'react-redux';
import {fetchPostsIfNeeded, invalidateMessagesList, sendMessge, appendPostFromMqtt} from '../actions';
import {NewMessageInput} from './NewMessageInput';
import {Posts} from './Posts';
import * as MqttClient from 'mqtt';

class App extends React.Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.handleSendTextMessage = this.handleSendTextMessage.bind(this);
  }

  componentDidMount(): void {
    const {dispatch} = this.props;
    dispatch(fetchPostsIfNeeded());
    this.subscribeOnMqttUpdates();
  }

  subscribeOnMqttUpdates() {
    const {dispatch} = this.props;

    let mqttClient = MqttClient.connect('ws://skicom.local:9001', {
      clientId: 'bgtestreact',
      protocolId: 'MQIsdp',
      protocolVersion: 3,
      connectTimeout: 1000
    });
    mqttClient.on('connect', function() {
      mqttClient.subscribe('messages');
    });
    mqttClient.on('message', function(topic: string, payload: Buffer) {
      if (topic === 'messages') {
        dispatch(appendPostFromMqtt(payload.toString()));
      }
    });
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