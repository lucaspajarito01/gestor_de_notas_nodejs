export class Classroom {
  #id; #code; #description; #capacity; #active;

  constructor({ id, code, description, capacity, active = 1 }) {
    this.#id = id;
    this.#code = code;
    this.#description = description;
    this.#capacity = capacity;
    this.#active = Boolean(active);
  }

  get capacity() { return this.#capacity; }
  get isActive() { return this.#active; }
}