'use strict';

// Dependencies
const { App, Logging }					= require( 'event_request' );
const { Loggur, LOG_LEVELS, Console }	= Logging;
const path								= require( 'path' );

const app			= App();
const PROJECT_ROOT	= path.parse( require.main.filename ).dir;

const logger		= Loggur.createLogger({
	transports: [
		new Console( { logLevel: LOG_LEVELS.notice } )
	]
});

Loggur.addLogger( 'main', logger );

app.apply( app.er_logger, { logger } );

// Attach the cache server
app.apply( app.er_data_server,	{ dataServerOptions: { persist: true } } );

// Parse body
app.apply( app.er_body_parser_form );
app.apply( app.er_body_parser_json );
app.apply( app.er_body_parser_multipart, { tempDir: path.join( PROJECT_ROOT, '/Uploads' ) } );
app.apply( app.er_body_parser_raw );

app.apply( app.er_timeout,	{ timeout		: 10 * 1000 } );

app.apply( app.er_session,	{ sessionKey	: 'hs_sid' } );

app.add( async ( event ) => {
	await event.initSession();
	event.next();
});
