"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var actions_1 = require("../actions");
var NewMessageInput_1 = require("./NewMessageInput");
var Posts_1 = require("./Posts");
var App = (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.handleRefreshClick = _this.handleRefreshClick.bind(_this);
        _this.handleSendTextMessage = _this.handleSendTextMessage.bind(_this);
        return _this;
    }
    App.prototype.componentDidMount = function () {
        var dispatch = this.props.dispatch;
        dispatch(actions_1.fetchPostsIfNeeded());
    };
    App.prototype.handleRefreshClick = function (e) {
        e.preventDefault();
        var dispatch = this.props.dispatch;
        dispatch(actions_1.invalidateMessagesList());
        dispatch(actions_1.fetchPostsIfNeeded());
    };
    App.prototype.handleSendTextMessage = function (newMessage) {
        var dispatch = this.props.dispatch;
        dispatch(actions_1.sendMessge(newMessage));
    };
    App.prototype.render = function () {
        var _a = this.props, posts = _a.posts, isFetching = _a.isFetching, lastUpdated = _a.lastUpdated;
        return (<div className="mdl-layout mdl-js-layout">
        <header className="mdl-layout__header">
          head menu
        </header>
        <main className="mdl-layout__content" style={{ flex: '1 0 auto' }}>
          <div>
            <p>
              {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                {' '}
            </span>}
              {!isFetching &&
            <a href='#' onClick={this.handleRefreshClick}>
                Refresh
              </a>}
            </p>
            {isFetching && posts.length === 0 &&
            <h2>Loading...</h2>}
            {!isFetching && posts.length === 0 &&
            <h2>Empty.</h2>}
            {posts.length > 0 &&
            <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts_1.Posts posts={posts}/>
            </div>}
          </div>
        </main>
        <NewMessageInput_1.NewMessageInput newMessage="" handleSend={this.handleSendTextMessage}/>
      </div>);
    };
    return App;
}(React.Component));
function mapStateToProps(state) {
    var chatMessages = state.chatMessages;
    var _a = chatMessages['messages'] || {
        isFetching: true,
        items: []
    }, isFetching = _a.isFetching, lastUpdated = _a.lastUpdated, posts = _a.items;
    return {
        posts: posts,
        isFetching: isFetching,
        lastUpdated: lastUpdated
    };
}
exports.default = react_redux_1.connect(mapStateToProps)(App);
