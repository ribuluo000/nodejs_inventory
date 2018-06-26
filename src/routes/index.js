'use strict';

import user from './user'
import provider from './provider'

export default app => {
	// app.get('/', (req, res, next) => {
	// 	res.redirect('/');
	// });
	app.use('/user', user);
	app.use('/provider', provider);
}