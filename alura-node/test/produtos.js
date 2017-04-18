const express = require('../config/express')();
const http = require('supertest')(express);


process.env.NODE_ENV = 'test';
describe('#ProdutosController Integrados', () => {
	beforeEach((done) => {
		const conn = express.infra.connectionFactory();
		conn.query('delete from livros', (ex) => {
			if (!ex) {
				done();
			}
		});
	});

	it('#listagem json', (done) => {
		http.get('/produtos')
			.set('Accept', 'application/json')
			.expect('Content-type', /json/)
			.expect(200, done);
	});

	it('#inserindo produto com dados invalidos', (done) => {
		http.post('/produtos')
			.send({ titulo: '', descricao: 'teste ' })
			.expect(400, done);
	});

	it('#inserindo produto com dados validos', (done) => {
		http.post('/produtos')
			.send({ titulo: 'teste', descricao: 'teste ', preco: 20.5 })
			.expect(302, done);
	});
});
