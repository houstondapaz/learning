'use strict'

module.exports = function promotionsController(app) {
	const _routes = {
		base: () => '/promocoes',
		form: () => _routes.base() + '/form'
	};

	const _views = {
		base: () => 'promotions/',
		form: () => _views.base() + 'form'
	};

	class PromotionController {
		static connect() {
			const connection = app.infra.connectionFactory();
			return new app.infra.Products(connection);
		}

		static form(request, response) {
			const connection = PromotionController.connect();

			connection.lista((errors, livros) => {
				response.render(_views.form(), { livros });
			});

			connection.close();
		}

		static save(request, response) {
			app.get('io').emit('novaPromocao', request.body);
			response.redirect(_routes.form());
		}
	}

	app.get(_routes.form(), PromotionController.form);
	app.post(_routes.base(), PromotionController.save)
}