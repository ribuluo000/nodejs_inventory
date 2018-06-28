'use strict';

import user from './user'
import provider from './provider'
import customer from './customer'
import product from './product'
import batch from './batch'
import bill from './bill'

export default app => {
	// app.get('/', (req, res, next) => {
	// 	res.redirect('/');
	// });
	app.use('/user', user);
	app.use('/provider', provider);
	app.use('/customer', customer);
	app.use('/product', product);
	app.use('/product/batch', batch);
	app.use('/bill', bill);
}