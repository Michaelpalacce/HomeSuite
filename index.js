const app	= require('event_request')();
const port	= process.env.PORT || 8000;

require( './src/main/server/kernel' );
require( './src/apps/notes/controllers' )

app.get( '/', ( event ) => {
	event.send( 'Test!' );
});

// Start Listening
app.listen( port, async () => {
	app.Loggur.log( `Server started on http://localhost:${port}` );
});