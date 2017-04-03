const mqttClient = require('mqtt')
const mqtt = require('./../config/mqtt')

module.exports = function (app, db) {

  app.get('/api/messages', (req, res) => {
    db.collection('messages').find({}).toArray((err, items) => {
      if (err) {
        res.send({'error':'An error has occurred!'})
      } else {
        res.send(items)
      }
    })
  })

  app.post('/api/messages', (req, res) => {
    const message = {author: req.body.author, text: req.body.text}

    let client = mqttClient.connect(mqtt.url, {
      clientId: 'bgtestnodejs',
      protocolId: 'MQIsdp',
      protocolVersion: 3,
      connectTimeout: 1000,
      debug: true
    })

    client.on('connect', function () {
      client.publish('messages', JSON.stringify(message))
      client.end()
    })

    db.collection('messages').insert(message, (err, result) => {
      if (err) {
        res.send({'error': 'An error has occurred'})
      } else {
        res.send(result.ops[0])
      }
    })
  })

  app.put('/api/messages/:id', (req, res) => {
    res.send('Put Message ' + req.toString())
  })

  app.delete('/api/messages/:id', (req, res) => {
    res.send('Delete Message ' + req.toString())
  })

}