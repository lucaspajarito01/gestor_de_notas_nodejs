export class Course {
  #id; #code; #description; #intensity; #weight; #active;

  constructor({ id, code, description, intensity, weight, active = 1 }) {
    this.#id = id;
    this.#code = code;
    this.#description = description;
    this.#intensity = intensity;
    this.#weight = weight;
    this.#active = Boolean(active);
  }

  get id() { return this.#id; }
  get code() { return this.#code; }
}