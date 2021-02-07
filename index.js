const app = require('event_request')();

require('./src/main/server/kernel');
require('./src/apps/notes/controllers')

// Start Listening
app.listen(8000, () => {
	app.Loggur.log('Server started');
});