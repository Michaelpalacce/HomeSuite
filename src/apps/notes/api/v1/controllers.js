const app = require('event_request')();
const notesVOneRouter = app.Router();

const notesGetRouter = require('./controllers/get');

notesVOneRouter.add(notesGetRouter);

module.exports = notesVOneRouter;