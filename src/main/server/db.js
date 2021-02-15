'use strict';

const { Loggur }		= require( 'event_request' );
const mongoose			= require( 'mongoose' );

const dbs				= { notes: null };

const connectionOptions	= {
	useNewUrlParser		: true,
	useUnifiedTopology	: true,
	useFindAndModify	: false,
	auth				: { authSource: 'admin' }
};

const database	= {
	/**
	 * @brief	Initializes the database.
	 *
	 * @details	Make sure to call this before even requiring any other project files.
	 * 			The reason for this is because if you don't initialize the db first, all the
	 * 			models will not be set and they will not be usable.
	 *
	 * 			This method initializes the databases:
	 * 			- hs-notes
	 *
	 * 			This method attaches the following models to itself:
	 * 			- Note
	 *
	 * @return	Promise<>
	 */
	init:	function()
	{
		return new Promise( ( resolve, reject ) => {
			const Schema				= mongoose.Schema;
			const ObjectId				= Schema.ObjectId;
			const connectionPromises	= [];

			['notes'].map( ( database ) => {
				const connectionString	= `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mongo:27017/hs-${database}`;

				connectionPromises.push(
					new Promise( async( resolve, reject ) => {
						dbs[database]	= await mongoose.connect( connectionString, connectionOptions ).catch( ( error )  => {
							const message	= `Connection to ${connectionString} failed. Reason: ${error.message}`;
							Loggur.log( message );
							reject( message );
						});

						resolve();
					})
				);
			});

			Promise.all( connectionPromises ).then( () => {
				database.Note	= dbs.notes.model( 'Note',
					new Schema({
						id			: ObjectId,
						title		: { type: String,	default: '',	min: 1,	max: 255 },
						content		: { type: String,	default: '' },
						date		: { type: Date,		default: Date.now },
						archived	: { type: Boolean,	default: false },
						tags		: { type: Array,	default: [] },
						images		: { type: Array,	default: [] }
						// owner		: { type: String,	required: true } // Add this when users are added
					})
				);

				resolve();
			}).catch( reject );
		});
	}
};


module.exports	= database;