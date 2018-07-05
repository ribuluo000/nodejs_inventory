console.log('111');


import express from 'express';
// import db1 from './common/db.js';
import config from 'config-lite';
import router from './routes/index.js';
import cookieParser from 'cookie-parser'
import session from 'express-session';
import connectMongo from 'connect-mongo';
import winston from 'winston';
import expressWinston from 'express-winston';
import path from 'path';
import history from 'connect-history-api-fallback';
import chalk from 'chalk';
import MyInitUtil from './util/MyInitUtil';
// import Statistic from './middlewares/statistic'

const app = express();
MyInitUtil.init(app);

app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.headers.Origin || req.headers.origin || 'https://cangdu.org');
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  	res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", '3.2.1')
	if (req.method == 'OPTIONS') {
	  	res.send(200);
	} else {
	    next();
	}
});

// app.use(Statistic.apiRecord)
const MongoStore = connectMongo(session);
app.use(cookieParser());
app.use(session({
	  name: config.session.name,
		secret: config.session.secret,
		resave: true,
		saveUninitialized: false,
		cookie: config.session.cookie,
		store: new MongoStore({
	  // url: config.url
            mongooseConnection:mongodb_conn1,
	})
}))

app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)({
          json: true,
          colorize: true
        }),
        new winston.transports.File({
          filename: 'src/logs/success.log'
        })
    ]
}));

router(app);

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        }),
        new winston.transports.File({
          filename: 'src/logs/error.log'
        })
    ]
}));

app.use(history());
app.use(express.static('src/public'));



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


app.listen(config.port, () => {
	console.log(
		chalk.green(`成功监听端口：${config.port}`)
	)
});