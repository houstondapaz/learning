const http = require('http');

const config = {
	hostname: 'localhost',
	port: '3000',
	path: '/produtos',
	headers: {
		Accept: 'application/json',
	},
};

http.get(config, (response) => {
	response.on('data', (body) => {
		console.log('Corpo: %s', body);
	});
});

