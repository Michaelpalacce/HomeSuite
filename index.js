const app	= require('event_request')();
const port	= process.env.APP_PORT || 8000;
require( './src/main/server/kernel' );
require( './src/apps/notes/controllers' )

// Start Listening
app.listen( port, () => {
	app.Loggur.log( `Server started on http://localhost:${port}` );
});