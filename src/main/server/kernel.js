'use strict';

// Dependencies
const app				= require( 'event_request' )();
const path				= require( 'path' );
const TemplatingEngine	= require( 'event_request/server/components/templating_engine/experimental_templating_engine' );

const PROJECT_ROOT		= path.parse( require.main.filename ).dir;

// Add environment variables to the process.env
app.apply( app.er_env );

const templatingEngine	= new TemplatingEngine();
app.apply( app.er_templating_engine, { templateDir: path.join( PROJECT_ROOT, './public/html' ), render: templatingEngine.renderFile.bind( templatingEngine ) } );

// Attach the cache server
app.apply( app.er_data_server,	{ dataServerOptions: { persist: true } } );

// Serve Static Resources
// app.apply( app.er_static,	{ paths	: ['public/imgs'] } );
// app.apply( app.er_static,	{ paths	: ['public/js', 'public/css'], cache: { cacheControl: 'public', expirationDirectives: { 'max-age': 120 } } } );

// Parse body
app.apply( app.er_body_parser_form );
app.apply( app.er_body_parser_json );
app.apply( app.er_body_parser_raw );

app.apply( app.er_timeout,	{ timeout		: 60 * 1000 } );

app.apply( app.er_session,	{ sessionKey	: 'er_sid' } );

app.add( async ( event ) => {
	await event.initSession();
	event.next();
});
