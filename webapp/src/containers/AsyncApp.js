import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {fetchPostsIfNeeded, invalidateReddit} from '../actions'
import Posts from '../components/Posts'

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const {dispatch} = this.props
    dispatch(fetchPostsIfNeeded())
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const {dispatch} = this.props
    dispatch(invalidateReddit())
    dispatch(fetchPostsIfNeeded())
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
        <div style={{padding: '0 10px'}}>
          <div className="mdl-textfield mdl-js-textfield">
            <input className="mdl-textfield__input" type="text" id="sample1"/>
            <label className="mdl-textfield__label" htmlFor="sample1">Text...</label>
          </div>
          <button className="mdl-button mdl-js-button" style={{margin: '0 10px'}} onClick={this.sendTextMessage}>Send
          </button>
        </div>
      </div>
    )
  }

  sendTextMessage() {
    console.log('TEST!!!');
  }
}

AsyncApp.propTypes = {
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const {postsByReddit} = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByReddit['reactjs'] || {
    isFetching: true,
    items: []
  }

  return {
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)