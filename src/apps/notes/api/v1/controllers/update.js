'use strict';

const app		= require( 'event_request' )();
const { Note }	= require( '../../../../../main/server/db' );
const router	= app.Router();

router.put(
	'/v1/update/:id:',
	app.er_validation.validate( { params: { id: 'string||range:12-24' } } ),
	( event ) => {
		Note.findByIdAndUpdate( event.params.id, event.body ).then(( result ) =>{
			if ( result === null )
				return event.sendError( { code: 'app.notes.update.notFound' }, 404 );

			event.send( '', 204 );
		}).catch(( error ) => { event.sendError( { code: 'app.notes.update.error', error }, 422 ); });
});

router.post(
	'/v1/update/:id:/tag',
	app.er_validation.validate( { params: { id: 'string||range:12-24' } } ),
	( event ) => {
		Note.findByIdAndUpdate( event.params.id, event.body ).then(( result ) =>{
			if ( result === null )
				return event.sendError( { code: 'app.notes.update.notFound' }, 404 );

			event.send( '', 204 );
		}).catch(( error ) => { event.sendError( { code: 'app.notes.update.error', error }, 422 ); });
});

module.exports	= router;
