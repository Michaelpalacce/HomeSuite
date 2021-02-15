'use strict';

const app		= require( 'event_request' )();
const { Note }	= require( '../../../../../main/server/db' );
const router	= app.Router();

/**
 * @brief	Gets all notes
 *
 * @details	Route: /notes/v1/get/all
 */
router.get( '/v1/get/all', async ( event ) => {
	event.send( await Note.find( {} ).exec() );
});

/**
 * @brief	Gets a note by it's id
 *
 * @details	Route: /notes/v1/get/:id:
 */
router.get(
	'/v1/get/:id:',
	app.er_validation.validate( { params: { id: 'string||range:12-24' } } ),
	async ( event ) => {
		const note	= await Note.findById( event.params.id );

		if ( note === null )
			return event.sendError( { code: 'app.notes.get.notFound' }, 404 );

		event.send( note );
	});

module.exports	= router;
