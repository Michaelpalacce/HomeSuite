'use strict';

const app		= require( 'event_request' )();
const { Note }	= require( '../../../../../main/server/db' );
const router	= app.Router();

router.post( '/v1/set', async( event ) => {
	// @todo add better validation.
	const note	= new Note( event.body );

	await note.save()
			.then(() =>{ 
				event.send( '', 204 );
			})
			.catch(( error ) => { 
				event.sendError( { code: 'app.notes.set.error', error }, 422 );
			});
});

module.exports	= router;