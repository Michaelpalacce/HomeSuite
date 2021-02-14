'use strict';

const app		= require( 'event_request' )();
const { Types }	= require( 'mongoose' );
const { Note }	= require( '../../../../../main/server/db' );
const router	= app.Router();

router.delete( 
	'/v1/delete/:id:',
	app.er_validation.validate( { params: { id: 'string||range:12-24' } } ),
	async( event ) => {
		const result	= await Note.findOneAndRemove( event.params.id ).catch( event.next );

		if ( result == null )
			throw { code: 'app.notes.delete.notFound', status: 404 };

		event.send( '', 204 );
});

module.exports	= router;