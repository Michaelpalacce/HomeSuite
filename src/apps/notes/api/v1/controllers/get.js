'use strict';

const app				= require( 'event_request' )();
const { notes }			= require( '../../../../../main/server/db' );
const notesGetRouter	= app.Router();

notesGetRouter.get( '/v1/get/all', async ( event ) => {
	const notesCollection	= await notes();
	event.send( await notesCollection.find( {} ).toArray() );
});

module.exports	= notesGetRouter;