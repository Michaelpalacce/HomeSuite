'use strict';

const app		= require('event_request')();
const port		= process.env.PORT || 8000;
const { init }	= require( './src/main/server/db' );

init().then(() => {
	app.Loggur.log( `MongoDB connection successfull, starting server now.` );

	require( './src/main/server/kernel' );
	require( './src/apps/notes/controllers' )
	
	// Start Listening
	app.listen( port, () => {
		app.Loggur.log( `Server started on http://localhost:${port}` );	
	});
});
