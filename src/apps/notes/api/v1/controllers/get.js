const app = require('event_request')();
const notesGetRouter = app.Router();

const mockNotes = [
    { id: '1', title: 'Sample Note', content: 'Note content!' },
];

notesGetRouter.get('/v1/get/all', (event) => {
    event.send(mockNotes);
});

module.exports = notesGetRouter;