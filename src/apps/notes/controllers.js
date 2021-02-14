const app = require('event_request')();

const notesVOneRouter = require('./api/v1/controllers');

app.add('/notes/', notesVOneRouter);