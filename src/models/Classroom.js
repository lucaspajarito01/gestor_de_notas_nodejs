export class Classroom {
  #id; #code; #description; #capacity; #active;

  constructor(id, code, description, capacity, active = 1) {
    this.#id = id;
    this.#code = code;
    this.#description = description;
    this.#capacity = capacity;
    this.#active = active;
  }

  get id() { return this.#id; }
  set id(value) { this.#id = value; }

  get code() { return this.#code; }
  set code(value) { this.#code = value; }

  get description() { return this.#description; }
  set description(value) { this.#description = value; }

  get capacity() { return this.#capacity; }
  set capacity(value) { this.#capacity = value; }

  get active() { return this.#active; }
  set active(value) { this.#active = value; }
}