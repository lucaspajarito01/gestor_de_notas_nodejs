export class City {
  #id; #code; #name;

  constructor(id, code, name) {
    this.#id = id;
    this.#code = code;
    this.#name = name;
  }

  get id() { return this.#id; }
  set id(value) { this.#id = value; }

  get code() { return this.#code; }
  set code(value) { this.#code = value; }

  get name() { return this.#name; }
  set name(value) { this.#name = value; }
}