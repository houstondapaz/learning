var mysql = require('mysql');

var _connections = {
    dev:{
        host : 'localhost',
        user : 'root',
        password : 'Hh,12345',
        database : 'casadocodigo_node'
    },
    test:{
        host : 'localhost',
        user : 'root',
        password : 'Hh,12345',
        database : 'casadocodigo_nodejs_teste'
    }
}

function  _getConnection() {
    if(_connections[process.env.NODE_ENV])
        return _connections[process.env.NODE_ENV];

    return _connections.dev;
}

function createDBConnection() {
    return mysql.createConnection( _getConnection());
}

module.exports = function() {
    return createDBConnection;
}