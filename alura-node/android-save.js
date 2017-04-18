const http = require('http');

const config = {
	hostname: 'localhost',
	port: '3000',
	path: '/produtos',
	method: 'post',
	headers: {
		Accept: 'application/json',
		'Content-type': 'application/json',
	},
};

const client = http.request(config, (res) => {
	console.log(res.statusCode);
	res.on('data', (body) => {
		console.log('Corpo: %s', body);
	});
});

const livro = {
	titulo: 'titulo 1',
};

client.end(JSON.stringify(livro));
