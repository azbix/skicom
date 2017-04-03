import React, { PropTypes, Component } from 'react'

class NewMessageInput extends Component {

  constructor() {
    super()
    this.state = {
      newMessage: ''
    }
  }

  update(e) {
    event.preventDefault()
    this.setState({newMessage: e.target.value})
  }

  handleSend(event) {
    event.preventDefault()
    this.props.handleSend(this.state.newMessage)
    this.setState({newMessage: ''})
  }

  render() {
    return (
      <div style={{padding: '0 10px'}}>
        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1" value={this.state.newMessage} onChange={this.update.bind(this)}/>
          <label className="mdl-textfield__label" htmlFor="sample1">Text...</label>
        </div>
        <button className="mdl-button mdl-js-button" style={{margin: '0 10px'}} onClick={this.handleSend.bind(this)}>Send</button>
      </div>
    )
  }
}

NewMessageInput.propTypes = {
  handleSend: PropTypes.func
}

export default NewMessageInput