'use strict';

const app		= require( 'event_request' )();
const { Types }	= require( 'mongoose' );
const { Note }	= require( '../../../../../main/server/db' );
const router	= app.Router();

/**
 * @brief	Deletes a note given it's id
 *
 * @details	Route: /notes/v1/delete/:id:
 */
router.delete(
	'/v1/delete/:id:',
	app.er_validation.validate( { params: { id: 'string||range:12-24' } } ),
	async( event ) => {
		const result	= await Note.findOneAndRemove( { _id: Types.ObjectId( event.params.id ) } ).catch( event.next );

		if ( result == null )
			throw { code: 'app.notes.delete.notFound', status: 404 };

		event.send( '', 204 );
});

module.exports	= router;
