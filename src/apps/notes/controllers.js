const app	= require( 'event_request' )();

app.add( '/notes/', require( './api/v1/controllers' ) );
