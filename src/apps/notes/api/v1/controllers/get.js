'use strict';

const app		= require( 'event_request' )();
const { Note }	= require( '../../../../../main/server/db' );
const router	= app.Router();

router.get( '/v1/get/all', async ( event ) => {
	event.send( await Note.find( {} ).exec() );
});

module.exports	= router;