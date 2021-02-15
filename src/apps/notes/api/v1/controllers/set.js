'use strict';

const app		= require( 'event_request' )();
const { Note }	= require( '../../../../../main/server/db' );
const router	= app.Router();

/**
 * @brief	Adds a new note
 *
 * @details	Route: /notes/v1/set
 * 			Accepted Body Params:
 * 			{
 * 				'title': String,
 * 				'content': String
 * 			}
 */
router.post( '/v1/set', async( event ) => {
	const validationResult	= event.validate( event.body, { title: 'optional||string', content: 'optional||string' } );

	if ( validationResult.hasValidationFailed() )
		return event.sendError( { code: 'app.notes.set.invalidParams' }, 400 );

	const note	= new Note( validationResult.getValidationResult() );

	await note.save().then(( result ) =>{
		event.send( { id: result._id }, 201 );
	}).catch(( error ) => {
		event.sendError( { code: 'app.notes.set.error', error }, 422 );
	});
});

module.exports	= router;
