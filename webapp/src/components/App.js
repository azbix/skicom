import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {fetchPostsIfNeeded, invalidateMessagesList, sendMessge} from '../actions'
import Posts from './Posts'
import NewMessageInput from './NewMessageInput'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handleSendTextMessage = this.handleSendTextMessage.bind(this)
  }

  componentDidMount() {
    const {dispatch} = this.props
    dispatch(fetchPostsIfNeeded())
  }

  handleRefreshClick(event) {
    event.preventDefault()

    const {dispatch} = this.props
    dispatch(invalidateMessagesList())
    dispatch(fetchPostsIfNeeded())
  }

  handleSendTextMessage(newMessage) {
    const {dispatch} = this.props
    dispatch(sendMessge(newMessage))
  }

  render() {
    const {posts, isFetching, lastUpdated} = this.props
    return (
      <div className="mdl-layout mdl-js-layout">
        <header className="mdl-layout__header">
          head menu
        </header>
        <main className="mdl-layout__content" style={{flex: '1 0 auto'}}>
          <div>
            <p>
              {lastUpdated &&
              <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                {' '}
            </span>
              }
              {!isFetching &&
              <a href='#'
                 onClick={this.handleRefreshClick}>
                Refresh
              </a>
              }
            </p>
            {isFetching && posts.length === 0 &&
            <h2>Loading...</h2>
            }
            {!isFetching && posts.length === 0 &&
            <h2>Empty.</h2>
            }
            {posts.length > 0 &&
            <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
            </div>
            }
          </div>
        </main>
        <NewMessageInput newMessage="" handleSend={this.handleSendTextMessage} />
      </div>
    )
  }
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const {chatMessages} = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = chatMessages['messages'] || {
    isFetching: true,
    items: []
  }

  return {
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)