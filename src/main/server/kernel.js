'use strict';

// Dependencies
const app			= require( 'event_request' )();
const path			= require( 'path' );

const PROJECT_ROOT	= path.parse( require.main.filename ).dir;

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
