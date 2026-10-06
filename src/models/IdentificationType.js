export class IdentificationType {
  #id; #code; #name; #description;

  constructor(id, code, name, description) {
    this.#id = id;
    this.#code = code;
    this.#name = name;
    this.#description = description;
  }

  get id() { return this.#id; }
  set id(value) { this.#id = value; }

  get code() { return this.#code; }
  set code(value) { this.#code = value; }

  get name() { return this.#name; }
  set name(value) { this.#name = value; }

  get description() { return this.#description; }
  set description(value) { this.#description = value; }
}