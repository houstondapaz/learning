'use strict'

class Products {
    constructor(connection) {
        this._connection = connection;
    }

    lista(callback) {
        this._connection.query('select * from livros', callback);
    }

    save(livro, callback) {
        this._connection.query('INSERT INTO livros SET ?', livro, callback);
    }

    close(){
        this._connection.end();
    }
}

module.exports = function () { return Products; }
