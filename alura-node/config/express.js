const express = require('express');
const load = require('express-load');
const bodyParser = require('body-parser');
const validator = require('express-validator');

module.exports = () => {
	const app = express();

	app.use(express.static('./app/public'));
	app.set('view engine', 'ejs');
	app.set('views', './app/views');
	app.set('x-powered-by', false)
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(validator());

	load('routes', { cwd: 'app' })
		.then('infra')
		.into(app);

	app.use((request, response, next) => {
		response.status(404).render('errors/404');
		next();
	});

	app.use((error, request, response, next) => {
		if (process.env.NODE_ENV === 'production') {
			response.status(500).render('errors/500');
		}
		else {
			next(error);
		}
	});


	return app;
};
