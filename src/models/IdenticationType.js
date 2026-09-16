export class IdentificationType {
    #id;
    #code;
    #name;
    #descripcion;

    constructor(id, code, name, descripcion){
        this.#id = id;
        this.#code = code;
        rhis.#name = name;
        this.#descripcion;
    }

    get id(){this.#id};
    get code(){this.#code};
    get name(){this.#name};
    get descripcion(){this.#descripcion};
}