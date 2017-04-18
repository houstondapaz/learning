'use strict'

module.exports = (app) => {
	const _routes = Object.freeze({
		base: () => '/'
	});

	const _views = Object.freeze({
		base: () => 'home/',
		index: () => _views.base() + 'index'
	});

	class HomeController {
		static connect() {
			const connection = app.infra.connectionFactory();
			return new app.infra.Products(connection);
		}

		static list(request, response, next) {
			const connection = HomeController.connect();

			connection.lista((errors, livros) => {
				if (errors) {
					next(errors);
				}
				else {
					response.render(_views.index(), { livros });
				}
			});

			connection.close();
		}
	}

	app.get(_routes.base(), HomeController.list);
};