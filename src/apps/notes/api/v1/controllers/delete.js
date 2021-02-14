'use strict';

const app		= require( 'event_request' )();
const { Types }	= require( 'mongoose' );
const { Note }	= require( '../../../../../main/server/db' );
const router	= app.Router();

router.delete( 
	'/v1/delete/:id:',
	app.er_validation.validate( { params: { id: 'string' } } ),
	async( event ) => {
		const result	= await Note.findOneAndRemove( { _id: Types.ObjectId( event.params.id ) } ).catch( event.next );

		console.log(`Result:${result}`);

		event.send( '', 200 );
});

module.exports	= router;