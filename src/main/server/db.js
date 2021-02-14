'use strict';

const app			= require( 'event_request' );
const MongoClient	= require( 'mongodb' ).MongoClient;

const dbs			= { notes: null };
const mongoDbUrl	= `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mongo:27017`;

const database		= { 
	getDb: async function()
	{
		if ( dbs.notes !== null )
			return dbs.notes;

		const client		= await MongoClient.connect( `${mongoDbUrl}`, { useNewUrlParser: true, useUnifiedTopology: true } ).catch( ( error)  => {
			const message	= `Connection to ${mongoDbUrl} failed. Reason: ${error.message}`;
			app.Loggur.log( message );
			throw message;
		});

		dbs.notes	= client.db( 'hs' );
		
		return dbs.notes;
	},

	notes: async function()
	{
		const db	= await database.getDb();

		return db.collection( 'hs-notes' );
	}
};

module.exports	= database;