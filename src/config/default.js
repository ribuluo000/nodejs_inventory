'use strict';

module.exports = {
	port: 8001,
	// url: 'mongodb://localhost:27017/elm',
    url: 'mongodb://dbuser001:passuser001@cluster0-shard-00-00-edl3p.mongodb.net:27017,cluster0-shard-00-01-edl3p.mongodb.net:27017,cluster0-shard-00-02-edl3p.mongodb.net:27017/inventory?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
	session: {
		name: 'SID',
		secret: 'SID',
		cookie: {
			httpOnly: true,
		    secure:   false,
		    maxAge:   365 * 24 * 60 * 60 * 1000,
		}
	}
}