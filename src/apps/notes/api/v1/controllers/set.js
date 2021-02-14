'use strict';

const app		= require( 'event_request' )();
const { Note }	= require( '../../../../../main/server/db' );
const router	= app.Router();

router.post( '/v1/set', async( event ) => {
	const note	= new Note( event.body );

	await note.save().then(() =>{ event.send( '', 201 ) }).catch( event.next );
});

module.exports	= router;