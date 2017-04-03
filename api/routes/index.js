const noteRoutes = require('./note_routes');
const messageRoutes = require('./message_routes');
module.exports = function(app, db) {
  noteRoutes(app, db);
  messageRoutes(app, db);
};