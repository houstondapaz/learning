export default class FotoService {
    constructor(resource) {
        this._resource = resource('http://localhost:3000/v1/fotos{/id}');
    }

    list() {
        return this._resource
            .query()
            .then(res => res.json());
    }

    apaga(id) {
        return this._resource
            .delete({ id });
    }

    adiciona(foto) {
        return this._resource.save(foto);
    }
}
