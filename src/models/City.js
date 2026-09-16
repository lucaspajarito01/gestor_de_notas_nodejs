export class City {
    #id;
    #code;
    #name;

    constructor(id, code, name){
        this.#id = id,
        this.#code = code;
        this.#name = name;
    }

    get id(){this.#id};
    get code(){this.#code};
    get name(){this.#name};
}