'use strict'

module.exports = (app) => {
	const _route = Object.freeze({
		base: () => '/produtos',
		form: () => '${_route.base()}/form'
	});

	const _views = Object.freeze({
		base: () => 'produtos/',
		list: () => _views.base() + 'lista',
		form: () => _views.base() + 'form'
	});


	class ProductsController {
		static connect() {
			const connection = app.infra.connectionFactory();
			return new app.infra.Products(connection);
		}

		static list(request, response, next) {
			const connection = ProductsController.connect();

			connection.lista((errors, lista) => {
				if (errors) {
					next(errors);
				} else {
					response.format({
						html() {
							response.render(_views.list(), { lista });
						},
						json() {
							response.json(lista);
						}
					});
				}
			});

			connection.close();
		}

		static showForm(response, errors, produto) {
			const status = errors.length ? 400 : 200;
			response.format({
				html() {
					response.status(status).render(_views.form(), { errors, produto });
				},
				json() {
					response.status(status).json({ errors, produto });
				}
			});
		}

		static create(request, response) {
			ProductsController.showForm(response, [], {});
		}

		static save(request, response, next) {
			const product = request.body;

			function Valid() {
				request.assert('titulo', 'Titulo é obrigatórtio').notEmpty();
				request.assert('preco', 'Formato inválido').isFloat();

				const errors = request.validationErrors();

				if (errors.length) {
					ProductsController.showForm(response, errors, product);
				}

				return !errors.length;
			}

			if (Valid()) {
				const connection = ProductsController.connect();

				connection.save(produto, (errors, resultado) => {
					if (errors) {
						next(errors);
					} else {
						response.status(302).redirect(_route.base());
					}
				});

				connection.close();
			}
		}
	}


	app.get(_route.base(), ProductsController.list);
	app.post(_route.base(), ProductsController.save);
	app.get(_route.form(), ProductsController.create);
}
