const app	= require( 'event_request' )();

require( './src/main/server/kernel' );

// Start Listening
app.listen( 8000, () => {
	app.Loggur.log( 'Server started' );
});