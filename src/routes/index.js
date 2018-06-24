'use strict';

import user from './user'

export default app => {
	// app.get('/', (req, res, next) => {
	// 	res.redirect('/');
	// });
	app.use('/user', user);
}