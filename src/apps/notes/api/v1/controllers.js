const app		= require( 'event_request' )();
const router	= app.Router();

router.add( require( './controllers/get' ) );
router.add( require( './controllers/set' ) );
router.add( require( './controllers/delete' ) );
router.add( require( './controllers/update' ) );

module.exports	= router;