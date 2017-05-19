export default class FotoService {
    constructor(resource) {
        this._resource = resource('http://localhost:3000/v1/fotos{/id}');
    }

    list() {
        return this._resource
            .query()
            .then(res => res.json(),
            err => {
                console.log(err);
                throw new Error('Não foi possivel recuperar as fotos');
            });
    }

    apaga(id) {
        return this._resource
            .delete({ id })
            .then(null,
            err => {
                console.log(err);
                throw new Error('Não foi possivel apagar a foto');
            });
    }

    cadastra(foto) {
        if (foto._id)
            return this.atualiza(foto);
        else
            return this.adiciona(foto);
    }

    atualiza(foto) {
        return this._resource
            .update({ id: foto._id }, foto);
    }

    adiciona(foto) {
        return this._resource.save(foto);
    }

    busca(id) {
        return this._resource.get({ id })
            .then(res => res.json());
    }
}
